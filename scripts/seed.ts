import { neon } from '@neondatabase/serverless'
import 'dotenv/config'
import { drizzle } from 'drizzle-orm/neon-http'
import membersData from './members.json'
import showsData from './shows.json'
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
                id: uuidv4(),
                name: 'Aturan Anti Cinta',
            },
            {
                id: uuidv4(),
                name: 'Cara Meminum Ramune',
            },
            {
                id: uuidv4(),
                name: 'Ingin Bertemu',
            },
            {
                id: uuidv4(),
                name: 'Pajama Drive'
            },
            {
                id: uuidv4(),
                name: 'Sambil Menggandeng Erat Tanganku'
            },
            {
                id: uuidv4(),
                name: 'Tunas di Balik Seragam'
            },
            {
                id: uuidv4(),
                name: 'STS'
            },
            {
                id: uuidv4(),
                name: 'Theatre Anniversary'
            },
            {
                id: uuidv4(),
                name: 'Event'
            },
            {
                id: uuidv4(),
                name: 'Trainee'
            },
            {
                id: uuidv4(),
                name: 'Core Member'
            },
            {
                id: uuidv4(),
                name: 'Ramadhan'
            }
          ]).returning()
        console.log('Categories seeded:', categories.length)
        const membersJSON = membersData.map((member: any) => ({
            id: uuidv4(),
            name: member.name,
            memberUrl: member.href
        }))
        const members = await db
          .insert(schema.members)
            .values(membersJSON)
            .returning()
        console.log('Members seeded:', members.length)
        const schedulesJSON = showsData.map((show: any) => ({
            id: uuidv4(),
            name: show.name,
            date: new Date((show.date + (7 * 3600)) * 1000),
            href: show.href,
            stsMember: null // Assuming no STS member for now
        }))
        const schedules = await db
          .insert(schema.schedules)
            .values(schedulesJSON)
            .returning()
        console.log('Schedules seeded:', schedules.length)
        console.log('Seeding completed.')
    } catch (error) {
        console.error(error);
        throw new Error("Failed to seed database");
    }
}

void main()