import { neon } from '@neondatabase/serverless'
import 'dotenv/config'
import { drizzle } from 'drizzle-orm/neon-http'
import { v4 as uuidv4 } from 'uuid';

import * as schema from '@/db/schema'

const sql = neon(process.env.DATABASE_URL as string)
const db = drizzle(sql, { schema })

// categories first, then member

const main = async () => {
    try {
        console.log('Seeding database...')
        await Promise.all([
            db.delete(schema.schedulesToCategories),
            db.delete(schema.membersToSchedules),
            db.delete(schema.categories),
            db.delete(schema.members),
            db.delete(schema.schedules)
        ])

        const categories = await db
          .insert(schema.categories)
          .values([
            {
                name: 'Aturan Anti Cinta',
            },
            {
                name: 'Cara Meminum Ramune',
            },
            {
                name: 'Ingin Bertemu',
            },
            {
                name: 'Pajama Drive'
            },
            {
                name: 'Sambil Menggandeng Erat Tanganku'
            },
            {
                name: 'Tunas di Balik Seragam'
            },
            {
                name: 'STS'
            },
            {
                name: 'Theatre Anniversary'
            },
            {
                name: 'Event'
            },
            {
                name: 'Trainee'
            },
            {
                name: 'Core Member'
            },
            {
                name: 'Ramadhan'
            }
          ]).returning()
        console.log('Categories seeded:', categories.length)
        // const members = await db
        //   .insert(schema.members)
        //     .values([
        //         {
        //             name: 'Sakura Miyawaki',
        //             memberUrl: 'https://jkt48.com/member/1'
        //         },
        //     ]).returning()
        console.log('Seeding completed.')
    } catch (error) {
        console.error(error);
        throw new Error("Failed to seed database");
    }
}

void main()