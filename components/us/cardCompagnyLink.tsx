import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Mail, MapPin, Phone } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function CardCompagnyLink({compagny} : {compagny: any}) {
    const router = useRouter();
    const handleSelectCompagnie = (compagnyId : any) => {
        localStorage.setItem('selectedCompagnieId', compagnyId);
        router.push('/dashboard');
      }
  return (
    <Card onClick={() => handleSelectCompagnie(compagny._id)} className=' shadow-xl max-w-xs w-72 hover:bg-slate-950 hover:text-slate-50 cursor-pointer'>
    <CardHeader>
        <CardTitle>{compagny.name}</CardTitle>
    </CardHeader>
    <CardContent>
        <CardDescription className='flex flex-col space-y-2'>
            <div className=' flex items-center space-x-2'>
                <Mail/> 
                <span>
                {compagny.email}
                </span>
            </div>
            <div className=' flex items-center space-x-2'>
                <Phone/> 
                <span>
                {compagny.tel}
                </span>
            </div>
            <div className=' flex items-center space-x-2'>
                <MapPin/> 
                <span>
                {compagny.address}
                </span>
            </div>
        </CardDescription>
    </CardContent>
    <CardFooter>
        XOF {compagny.chiffreAffaires}
    </CardFooter>
</Card>
  )
}
