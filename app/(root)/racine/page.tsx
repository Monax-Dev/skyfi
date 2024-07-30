"use client"  
import CardCompagnyLink from '@/components/us/cardCompagnyLink'
import React, { useEffect, useState } from 'react'
import { toast, Toaster } from 'react-hot-toast'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import Link from 'next/link'
import { HousePlus, LoaderCircle } from 'lucide-react'

export default function Racine() {
    const [compagnies, setCompagnies] = useState([]);
    const [loading, setLoading] = useState(true);
    
  useEffect(() => {
    const fetchCompagnies = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/compagnies');
        const responseUser = await fetch('/api/users/me');
        let data = await response.json();
        let dataUser = await responseUser.json();
        if (response.ok) {
          const user = dataUser.data;
          const list = data.compagnies.filter((compagny : any) => compagny.createdBy === user._id);  
          setCompagnies(list);
          setLoading(false)
        } 
      } catch (error) {
          console.error(error)
          toast.error('An error occurred. Please try again later.');
          setLoading(false)
      }
    };

    fetchCompagnies();
  }, [])

  

  return (
    <div className='min-h-screen w-full overflow-x-hidden flex flex-col px-4 py-6 space-y-8'>
      <Toaster position='bottom-right'/> 
       <div>
              <h1 className='text-3xl font-bold'>Mes Compagnies</h1>
       </div>
        <div className='container mx-auto w-full grid grid-cols-2 lg:grid-cols-4 items-start gap-4 flex-wrap justify-center lg:justify-normal'>
           {
                loading ? (
                    <Card  className=' shadow-xl max-w-xs w-64 h-60 hover:bg-slate-950 hover:text-slate-50 flex items-center justify-center'>
                        <LoaderCircle className='size-16 animate-spin ease-in-out'/>
                    </Card>
                ) :(
                  compagnies.length > 0 && compagnies.map((compagny, index) => (
                          <CardCompagnyLink key={index} compagny={compagny}/>
                  ))
                )
           }
            <Link href={`/racine/addCompagny`}>
                <Card className=' shadow-xl max-w-xs w-64 h-60 hover:bg-slate-950 hover:text-slate-50 cursor-pointer'>
                    <CardTitle className=' flex flex-col items-center justify-center h-full'> 
                        <HousePlus className=' size-16'/>
                    </CardTitle>
                </Card>
            </Link>
        </div>
    </div>
  )
}
