import { neon } from '@neondatabase/serverless'
import 'dotenv/config'
import { drizzle } from 'drizzle-orm/neon-http'
import { Member, Schedule, Category } from '@/db/types'
import membersJSON from '@/json/members.json'
import showsJSON from '@/json/shows.json'

import * as schema from '@/db/schema'

const sql = neon(process.env.DATABASE_URL as string)
const db = drizzle(sql, { schema })

const main = async () => {
    try {
        console.log('Seeding database...')
        await Promise.all([
            db.delete(schema.schedulesToCategories),
            db.delete(schema.membersToSchedules),
            db.delete(schema.membersToCategories),
            db.delete(schema.ticketHistories),
            db.delete(schema.categories),
            db.delete(schema.members),
            db.delete(schema.schedules),
        ])
        const categoriesData: Omit<Category, 'id'>[] = [
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
                name: 'Pajama Drive',
            },
            {
                name: 'Sambil Menggandeng Erat Tanganku',
            },
            {
                name: 'Tunas di Balik Seragam',
            },
            {
                name: 'STS',
            },
            {
                name: 'Theatre Anniversary',
            },
            {
                name: 'Event',
            },
            {
                name: 'Trainee',
            },
            {
                name: 'Core Member',
            },
            {
                name: 'Ramadhan',
            },
        ]
        const categories = await db
            .insert(schema.categories)
            .values(categoriesData)
            .returning()
        console.log('Categories seeded:', categories.length)

        const membersData = membersJSON.map(
            (member: { name: string; href: string }) =>
                ({
                    name: member.name,
                    url: member.href,
                } as Omit<Member, 'id'>)
        )
        const members = await db
            .insert(schema.members)
            .values(membersData)
            .returning()
        console.log('Members seeded:', members.length)

        const schedulesData = showsJSON.map(
            (show: { name: string; date: number; href: string }) =>
                ({
                    name: show.name,
                    date: new Date(show.date * 1000), // IN UTC
                    url: show.href,
                    stsMemberId: null, // Assuming no STS member for now
                } as Omit<Schedule, 'id'>)
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
