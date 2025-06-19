import { neon } from '@neondatabase/serverless'
import 'dotenv/config'

const sql = neon(process.env.DATABASE_URL as string)

/**
 * Delete All Tables for development purposes
 */
const main = async () => {
    try {
        await sql.transaction([
            sql`DROP TABLE IF EXISTS members_to_categories CASCADE`,
            sql`DROP TABLE IF EXISTS members_to_schedules CASCADE`,
            sql`DROP TABLE IF EXISTS schedules_to_categories CASCADE`,
            sql`DROP TABLE IF EXISTS "ticketHistories_to_schedules" CASCADE`,
            sql`DROP TABLE IF EXISTS "ticketHistories" CASCADE`,
            sql`DROP TABLE IF EXISTS categories CASCADE`,
            sql`DROP TABLE IF EXISTS members CASCADE`,
            sql`DROP TABLE IF EXISTS schedules CASCADE`,
        ])
        console.log("Database reset successfully");
    } catch (error) {
        console.error(error);
        throw new Error("Failed to delete database");
    }
}

void main()