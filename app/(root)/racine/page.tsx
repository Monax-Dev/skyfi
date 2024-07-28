import CardCompagnyLink from '@/components/us/cardCompagnyLink'
import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import Link from 'next/link'
import { HousePlus } from 'lucide-react'

const data = [
    {
        name: 'Skypiea Records',
        email: 'skypiearecords@skypieaent.sn',
        tel: '33 000 00 00',
        address: 'Ouest Foire, Dakar',
        chiffreAffaires: 1000000000000000
    },
    {
        name: 'Skypiea Visuels',
        email: 'skypieavisuels@skypieaent.sn',
        tel: '33 000 00 00',
        address: 'Ouest Foire, Dakar',
        chiffreAffaires: 1000000000000000
    },
    {
        name: 'Skypiea Shop',
        email: 'skypieashop@skypieaent.sn',
        tel: '33 000 00 00',
        address: 'Ouest Foire, Dakar',
        chiffreAffaires: 1000000000000000
    }
]

export default function page() {
  return (
    <div className='h-screen w-full overflow-hidden flex flex-col px-8 py-12 space-y-12'>
       <div>
              <h1 className='text-3xl font-bold'>Mes Compagnies</h1>
       </div>
        <div className='container mx-auto w-full flex items-start gap-4 flex-wrap justify-center lg:justify-normal'>
           {
                data.map((compagny, index) => (
                    <CardCompagnyLink key={index} compagny={compagny}/>
                ))
           }
            <Link href={`/racine/addCompagny`}>
                <Card className=' shadow-xl max-w-xs w-72 h-60 hover:bg-slate-950 hover:text-slate-50 cursor-pointer'>
                    <CardTitle className=' flex flex-col items-center justify-center h-full'> 
                        <HousePlus className=' size-16'/>
                    </CardTitle>
                </Card>
            </Link>
        </div>
    </div>
  )
}
