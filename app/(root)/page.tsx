import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";

export default function Home() {
  return (
    <>
     <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8 px-4 md:px-8">
            <h1 className="text-4xl font-bold ">Host, Connect, Celebrate: Your Events, Our Platform!</h1>
            <p className="text-lg md:text-xl">Book and learn helpful tips from the speakers of world-class companies with our global community.</p>
            <Button size="lg" asChild className="button w-full sm:w-fit">
              <Link href="#events">
                Explore Now
              </Link>
            </Button>
          </div>

          <Image 
            src="/assets/images/hero.png"
            alt="hero"
            width={1000}
            height={1000}
            className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
          />
        </div>
      </section> 
    
    

    <section id="events" className="wrapper my-8 flex flex-col gap-8 md:gap-12 px-4 md:px-8">
      <h2 className="text-4xl font-bold">Trust by <br /> Thousands of Events</h2>

      <div className="flex w-full flex-col gap-5 ">
        Search
        CategoryFilter
      </div>
    </section>

    </>
  )
}
