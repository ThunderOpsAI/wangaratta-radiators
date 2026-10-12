import { neon, neonConfig } from '@neondatabase/serverless';

// Configure neon if necessary
const databaseUrl = process.env.DATABASE_URL || '';

// In-memory fallback stores for local development without DB credentials or build steps
const memoryStore = {
  quotes: [] as any[],
  reviews: [
    {
      id: 'rev-1',
      customer_name: 'Crown Building & Construction',
      location: 'Wangaratta / Boralma',
      star_rating: 5,
      project_type: 'Architectural House Slab & Nil-Exposure Floor',
      review_text: 'Wangaratta Radiators is our premier Radiators contractor in North East Victoria. On the Boralma country residence, Wangaratta Radiators executed the architectural house slab and delivered the flawless nil-exposure interior pour across the living and dining areas. Absolute master of his craft.',
      created_at: new Date('2024-03-15').toISOString(),
    },
    {
      id: 'rev-2',
      customer_name: 'Beau Wheeler (Beau & Co Construction)',
      location: 'Wangaratta',
      star_rating: 5,
      project_type: 'Residential Extensions & Slabs',
      review_text: 'We partner with Wangaratta Radiators on custom renovations and extensions including Project J1104. Pours are always level to the millimetre, reinforcement steel tied accurately, and joints saw-cut on schedule. You cannot beat 26 years of local experience.',
      created_at: new Date('2024-05-20').toISOString(),
    },
    {
      id: 'rev-3',
      customer_name: 'David & Karen M.',
      location: 'Milawa, VIC',
      star_rating: 5,
      project_type: 'Exposed Aggregate Driveway',
      review_text: 'Wangaratta Radiators poured a 210m² exposed aggregate driveway and alfresco patio with Country Concrete\'s Alpine River Pebble mix. The washed finish and non-slip sealer look incredible and drain perfectly through North East winter rains.',
      created_at: new Date('2024-08-10').toISOString(),
    },
    {
      id: 'rev-4',
      customer_name: 'Graeme H.',
      location: 'Glenrowan',
      star_rating: 5,
      project_type: '24m x 12m Machinery Shed Slab',
      review_text: 'Built a heavy machinery shed to park 20-tonne headers and tractors. Wangaratta Radiators set up the laser levels, reinforced with SL82 mesh, poured 32 MPa concrete at 150mm with thickened haunches. Spot on job and fair price.',
      created_at: new Date('2024-09-02').toISOString(),
    },
    {
      id: 'rev-5',
      customer_name: 'Sarah & Tom B.',
      location: 'Beechworth',
      star_rating: 5,
      project_type: 'Custom Concrete Hearth & Alfresco',
      review_text: 'Wangaratta Radiators poured our custom fireplace concrete hearth and perimeter veranda slabs. Fantastic attention to detail and clean work site. Highly recommended across the North East.',
      created_at: new Date('2024-10-18').toISOString(),
    }
  ],
  call_logs: [] as any[],
};

export const sql = databaseUrl ? neon(databaseUrl) : null;

let isDbInitialized = false;

export async function ensureDbTables() {
  if (!sql) {
    return;
  }
  if (isDbInitialized) return;

  try {
    // Quotes table
    await sql`
      CREATE TABLE IF NOT EXISTS quotes (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(100),
        last_name VARCHAR(100),
        email VARCHAR(255),
        phone VARCHAR(50),
        project_type VARCHAR(100),
        site_address VARCHAR(255),
        estimated_area NUMERIC(10,2),
        slab_thickness VARCHAR(50),
        finish_type VARCHAR(100),
        site_access VARCHAR(100),
        earthworks BOOLEAN DEFAULT false,
        message TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Reviews table
    await sql`
      CREATE TABLE IF NOT EXISTS reviews (
        id SERIAL PRIMARY KEY,
        customer_name VARCHAR(150) NOT NULL,
        location VARCHAR(100),
        star_rating INT NOT NULL CHECK (star_rating >= 1 AND star_rating <= 5),
        review_text TEXT NOT NULL,
        project_type VARCHAR(100),
        verified BOOLEAN DEFAULT true,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Call clicks table
    await sql`
      CREATE TABLE IF NOT EXISTS call_logs (
        id SERIAL PRIMARY KEY,
        intent VARCHAR(100),
        referrer TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Seed default reviews if empty
    const existing = await sql`SELECT COUNT(*) as count FROM reviews;`;
    if (existing && existing[0] && parseInt(existing[0].count, 10) === 0) {
      for (const rev of memoryStore.reviews) {
        await sql`
          INSERT INTO reviews (customer_name, location, star_rating, review_text, project_type, verified, created_at)
          VALUES (${rev.customer_name}, ${rev.location}, ${rev.star_rating}, ${rev.review_text}, ${rev.project_type}, true, ${rev.created_at});
        `;
      }
    }

    isDbInitialized = true;
  } catch (err) {
    console.warn('Neon database initialization warning (falling back to memory store):', err);
  }
}

export async function insertQuote(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  projectType: string;
  siteAddress?: string;
  estimatedArea?: number;
  slabThickness?: string;
  finishType?: string;
  siteAccess?: string;
  earthworks?: boolean;
  message: string;
}) {
  if (sql) {
    try {
      await ensureDbTables();
      const res = await sql`
        INSERT INTO quotes (
          first_name, last_name, email, phone, project_type, site_address,
          estimated_area, slab_thickness, finish_type, site_access, earthworks, message
        ) VALUES (
          ${data.firstName}, ${data.lastName}, ${data.email}, ${data.phone},
          ${data.projectType}, ${data.siteAddress || null}, ${data.estimatedArea || null},
          ${data.slabThickness || null}, ${data.finishType || null}, ${data.siteAccess || null},
          ${data.earthworks || false}, ${data.message}
        ) RETURNING id, created_at;
      `;
      return res[0];
    } catch (err) {
      console.warn('Error saving quote to Neon DB, caching in memory:', err);
    }
  }

  const record = {
    id: 'quote_' + Date.now(),
    ...data,
    created_at: new Date().toISOString(),
  };
  memoryStore.quotes.push(record);
  return record;
}

export async function getApprovedReviews() {
  if (sql) {
    try {
      await ensureDbTables();
      const rows = await sql`
        SELECT 
          id::text, 
          customer_name as "customerName", 
          star_rating as "starRating", 
          review_text as "reviewText", 
          project_type as "projectType", 
          location,
          created_at as "createdAt"
        FROM reviews 
        WHERE verified = true 
        ORDER BY created_at DESC;
      `;
      if (rows && rows.length > 0) {
        return rows;
      }
    } catch (err) {
      console.warn('Error fetching reviews from Neon, falling back to cached reviews:', err);
    }
  }

  return memoryStore.reviews.map(r => ({
    id: r.id,
    customerName: r.customer_name,
    starRating: r.star_rating,
    reviewText: r.review_text,
    projectType: r.project_type,
    location: r.location,
    createdAt: r.created_at,
  }));
}

export async function insertReview(data: {
  customerName: string;
  location?: string;
  starRating: number;
  projectType?: string;
  reviewText: string;
}) {
  if (sql) {
    try {
      await ensureDbTables();
      const res = await sql`
        INSERT INTO reviews (customer_name, location, star_rating, project_type, review_text, verified)
        VALUES (${data.customerName}, ${data.location || null}, ${data.starRating}, ${data.projectType || null}, ${data.reviewText}, true)
        RETURNING id, created_at;
      `;
      return res[0];
    } catch (err) {
      console.warn('Error saving review to Neon DB, using memory fallback:', err);
    }
  }

  const record = {
    id: 'rev_' + Date.now(),
    customer_name: data.customerName,
    location: data.location || 'Wangaratta',
    star_rating: data.starRating,
    project_type: data.projectType || 'Radiators',
    review_text: data.reviewText,
    created_at: new Date().toISOString(),
  };
  memoryStore.reviews.unshift(record);
  return record;
}

export async function logCallClick(intent: string, referrer?: string) {
  if (sql) {
    try {
      await ensureDbTables();
      await sql`
        INSERT INTO call_logs (intent, referrer)
        VALUES (${intent}, ${referrer || null});
      `;
      return true;
    } catch (err) {
      console.warn('Error logging call click:', err);
    }
  }
  memoryStore.call_logs.push({ intent, referrer, timestamp: new Date().toISOString() });
  return true;
}

export default sql;
