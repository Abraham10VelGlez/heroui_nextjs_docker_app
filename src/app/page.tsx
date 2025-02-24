import Image from "next/image";
import Backgroudpage from "@/components/Backgroundpage";
import Skeletonx from "@/components/Skeletonx";

export default function Home() {
  return (
    <>
      <Backgroudpage></Backgroudpage>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">


          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <Image
              className="dark:invert"
              src="/next.svg"
              alt="Next.js logo"
              width={110}
              height={38}
              priority
            /> +
            <Image
              className="dark:invert"
              src="/images/heroui.png"
              alt="Next.js logo"
              width={50}
              height={25}
              priority
            />
          </div>

          <div className="flex gap-4 items-center flex-col sm:flex-row">

            <Skeletonx></Skeletonx>

          </div>

          <div className="flex gap-4 items-center flex-col sm:flex-row">


            HEROUI + NEXTJS + DOCKER
          </div>

        </main>

      </div>
    </>

  );
}
