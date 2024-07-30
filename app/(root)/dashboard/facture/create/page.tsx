"use client"
import { CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { FilePlus2, Mail, MapPin, Phone } from 'lucide-react'
import React, { use, useEffect, useState } from 'react'
import {format} from 'date-fns'
import { fr } from 'date-fns/locale';
export default function AddFacture() {
  const currentDate = format(new Date(), "d MMMM yyyy", { locale: fr });
  const [idCompagnie, setIdCompagnie] = useState(localStorage.getItem("selectedCompagnieId") || "");
    const [company, setCompany] = useState<any>({});
    const [client, setClient] = useState([]);
    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0);
    
    useEffect(() => {
      setIdCompagnie(localStorage.getItem("selectedCompagnieId") || "");
      if (idCompagnie) {
        fetch(`/api/compagnies/${idCompagnie}`)
          .then((res) => res.json())
          .then((data) => {
            setCompany(data.compagnie);
           
          });
      }
    }, [idCompagnie]);
  return (
    <div className="flex w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background sm:static sm:h-auto sm:border-0 sm:bg-transparent ">
          <div className=" hidden md:flex">
            <CardTitle className='flex items-center '><FilePlus2 className=' size-10'/> Créer une facture</CardTitle>
          </div>

        </header>
      </div>
      <div>
        <ScrollArea className=" w-full rounded-md border p-4 flex flex-col items-center justify-start">
          {/* En tête */}
            <div className='grid grid-cols-2 w-full border-b-2 border-slate-950 py-6' >
                <div className=' flex items-center justify-start'>
                    <h1 className='text-2xl font-bold'>{company.name}</h1>
                </div>
                <div className=' flex flex-col items-end justify-end'>
                    <p className=' flex items-center'>{company.tel}<Phone className=' size-4 ml-2'/></p>
                    <p className=' flex items-center'>{company.email}<Mail className=' size-4 ml-2'/></p>
                    <p className=' flex items-center'>{company.address}<MapPin className=' size-4 ml-2'/></p>
                </div>
            </div>
            {/* Date */}
            <div className='w-full py-6 flex justify-end items-end' >
                <h1 className='text-lg font-semibold'>Le {currentDate}</h1>
            </div>
            {/* Client */}
            <div className='w-full py-6 flex justify-start items-start' >
                <h1 className='text-lg font-semibold'>Client</h1>
            </div>
        </ScrollArea>
      </div>
    </div>
  )
}
