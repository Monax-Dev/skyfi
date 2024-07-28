"use client"
import CardCompagnyLink from '@/components/us/cardCompagnyLink'
import React, { useEffect, useState } from 'react'
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

export default function Racine() {
    const [compagnies, setCompagnies] = useState([]);
    
    
  useEffect(() => {
    const fetchCompagnies = async () => {
      try {
        const response = await fetch('/api/compagnies');
        let data = await response.json();

        if (response.ok) {
          setCompagnies(data.compagnies);
        } else {
        
        }
      } catch (error) {
       
      }
    };

    fetchCompagnies();
  }, [])

  

  return (
    <div className='h-screen w-full overflow-hidden flex flex-col px-8 py-12 space-y-12'>
       <div>
              <h1 className='text-3xl font-bold'>Mes Compagnies</h1>
       </div>
        <div className='container mx-auto w-full flex items-start gap-4 flex-wrap justify-center lg:justify-normal'>
           {
                compagnies.length > 0 && compagnies.map((compagny, index) => (
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
