import Image from "next/image"

const HospitalPartner = () => {
    const image = [
        "https://play-lh.googleusercontent.com/cWcxW6JqiI5ofxqdOqqa24OSoYAbRXBnBbkFKet8d_aHl6FtAWYUW4DhXFUgrhBxzBc=w600-h300-pc0xffffff-pd",
        "https://img.freepik.com/premium-vector/popular-diagnostic-logo_636116-307.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRT_VglavgdZpno4V5YjOWRH-xSH0yXW7a74A&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsMnyUub-dIjPPNW0EndS6Mzh58UL1r6ta2A&s",
        "https://images.seeklogo.com/logo-png/63/1/praava-health-logo-png_seeklogo-632083.png"
    ]

    return(
       <div>
        <p className=" md:text-5xl text-3xl text-center  font-extrabold leading-tight my-10 ">Our Hospital Partners</p>
         <div className=" flex justify-between">
            {
                image?.map((item,inx) => <div key={inx} className="flex justify-center items-center gap-10"><Image className="h-[100px] w-[100px]" src={item} width={150} height={150} alt=""/>
               </div>)
            }
        </div>
       </div>
    )
}


export default HospitalPartner