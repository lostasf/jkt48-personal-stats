import { neon } from '@neondatabase/serverless'
import 'dotenv/config'
import { drizzle } from 'drizzle-orm/neon-http'
import { Member, Schedule, Category } from '@/db/types/models'
import membersJSON from '@/json/members.json'
import showsJSON from '@/json/shows.json'
import { v4 as uuidv4 } from 'uuid'

import * as schema from '@/db/schema'

const sql = neon(process.env.DATABASE_URL as string)
const db = drizzle(sql, { schema })

const main = async () => {
    try {
        console.log('Seeding database...')
        await Promise.all([
            db.delete(schema.ticketHistoryToSchedules),
            db.delete(schema.schedulesToCategories),
            db.delete(schema.membersToSchedules),
            db.delete(schema.membersToCategories),
            db.delete(schema.ticketHistories),
            db.delete(schema.categories),
            db.delete(schema.members),
            db.delete(schema.schedules),
        ])
        const categoriesData: Category[] = [
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
                    name: 'Pajama Drive',
                },
                {
                    id: uuidv4(),
                    name: 'Sambil Menggandeng Erat Tanganku',
                },
                {
                    id: uuidv4(),
                    name: 'Tunas di Balik Seragam',
                },
                {
                    id: uuidv4(),
                    name: 'STS',
                },
                {
                    id: uuidv4(),
                    name: 'Theatre Anniversary',
                },
                {
                    id: uuidv4(),
                    name: 'Event',
                },
                {
                    id: uuidv4(),
                    name: 'Trainee',
                },
                {
                    id: uuidv4(),
                    name: 'Core Member',
                },
                {
                    id: uuidv4(),
                    name: 'Ramadhan',
                },
            ]
        const categories = await db
            .insert(schema.categories)
            .values(categoriesData)
            .returning()
        console.log('Categories seeded:', categories.length)

        const membersData = membersJSON.map(
            (member: { name: string; href: string }) => ({ 
                id: uuidv4(),
                name: member.name,
                url: member.href,
            } as Member)
        )
        const members = await db
            .insert(schema.members)
            .values(membersData)
            .returning()
        console.log('Members seeded:', members.length)

        const schedulesData = showsJSON.map(
            (show: { name: string; date: number; href: string }) => ({
                id: uuidv4(),
                name: show.name,
                date: new Date((show.date + 7 * 3600) * 1000), // Convert to UTC
                url: show.href,
                stsMemberId: null, // Assuming no STS member for now
            } as Schedule)
        )
        const schedules = await db
            .insert(schema.schedules)
            .values(schedulesData)
            .returning()
        console.log('Schedules seeded:', schedules.length)
        console.log('Seeding completed.')
    } catch (error) {
        console.error(error)
        throw new Error('Failed to seed database')
    }
}

void main()
