import Link from "next/link"
import Image from "next/image"
const Footer=() =>{
    return(
        <footer className="border-t">
            <div className="flex-center wrapper flex-between flex flex-col
             gap-3 p-3 text-center sm:flex-row">
                <Link href='/'>
                    <Image className=" mx-auto flex items-center justify-center"
                    src="/assets/images/logo.svg"
                    alt="logo"
                    width={128}
                    height={38}
                    />
                </Link>
                <p>2024 Evently.Book your events.</p>
            </div>
        </footer>
        
    )
}
export default Footer