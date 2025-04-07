import AnimatedShinyText from "@/components/ui/animated-shiny-text";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { Courgette } from "next/font/google";

const courgette = Courgette({
  subsets: ["latin"],
  weight: "400",
});
const Testimonials = () => {
  return (
    <div className="space-y-10">
      <div className="flex flex-col items-center justify-center space-y-5 text-center">
        <div
          className={cn(
            "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800",
            courgette.className,
          )}
        >
          <AnimatedShinyText className="inline-flex items-center justify-center px-5 py-[3px] transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
            <span>✨ Testimonials</span>
          </AnimatedShinyText>
        </div>
        <div className="space-y-3">
          <h2 className={cn("text-4xl font-bold", courgette.className)}>
          See What Our Users Say About Us
          </h2>
          <p className="text-sm">
            Our very own wall of love. Or complaints. Whatever you want to call
            it.
          </p>
        </div>
      </div>
      <div>
      <div className="-mx-3 items-start md:flex">
        <div className="px-3 md:w-1/3">
          <div className="mx-auto mb-6 w-full rounded-xl p-6 text-gray-800 shadow-custom transform transition-transform duration-300 hover:-translate-y-[2px] hover:translate-x-[2px] cursor-pointer">
            <div className="mb-4 flex w-full items-center">
              <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-50">
                <img src="https://i.pravatar.cc/100?img=1" alt="" />
              </div>
              <div className="flex-grow pl-3">
                <h6 className="text-sm font-bold uppercase text-gray-600">
                  Kenzie Edgar.
                </h6>
              </div>
              <div className="flex gap-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              </div>
            </div>
            <div className="w-full">
              <p className="text-sm leading-tight">
                <span className="mr-1 text-xl font-bold italic leading-none text-gray-400">
                  "
                </span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
                sunt ratione dolor exercitationem minima quas itaque saepe quasi
                architecto vel! Accusantium, vero sint recusandae cum tempora
                nemo commodi soluta deleniti.
                <span className="ml-1 text-xl font-bold italic leading-none text-gray-400">
                  "
                </span>
              </p>
            </div>
          </div>
          <div className="mx-auto mb-6 w-full rounded-xl p-6 text-gray-800 shadow-custom transform transition-transform duration-300 hover:-translate-y-[2px] hover:translate-x-[2px] cursor-pointer">
            <div className="mb-4 flex w-full items-center">
              <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-50">
                <img src="https://i.pravatar.cc/100?img=2" alt="" />
              </div>
              <div className="flex-grow pl-3">
                <h6 className="text-sm font-bold uppercase text-gray-600">
                  Stevie Tifft.
                </h6>
              </div>
              <div className="flex gap-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              </div>
            </div>
            <div className="w-full">
              <p className="text-sm leading-tight">
                <span className="mr-1 text-xl font-bold italic leading-none text-gray-400">
                  "
                </span>
                Lorem ipsum, dolor sit amet, consectetur adipisicing elit.
                Dolore quod necessitatibus, labore sapiente, est, dignissimos
                ullam error ipsam sint quam tempora vel.
                <span className="ml-1 text-xl font-bold italic leading-none text-gray-400">
                  "
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="px-3 md:w-1/3">
          <div className="mx-auto mb-6 w-full rounded-xl p-6 text-gray-800 shadow-custom transform transition-transform duration-300 hover:-translate-y-[2px] hover:translate-x-[2px]">
            <div className="mb-4 flex w-full items-center">
              <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-50">
                <img src="https://i.pravatar.cc/100?img=3" alt="" />
              </div>
              <div className="flex-grow pl-3">
                <h6 className="text-sm font-bold uppercase text-gray-600">
                  Tommie Ewart.
                </h6>
              </div>
              <div className="flex gap-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              </div>
            </div>
            <div className="w-full">
              <p className="text-sm leading-tight">
                <span className="mr-1 text-xl font-bold italic leading-none text-gray-400">
                  "
                </span>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae,
                obcaecati ullam excepturi dicta error deleniti sequi.
                <span className="ml-1 text-xl font-bold italic leading-none text-gray-400">
                  "
                </span>
              </p>
            </div>
          </div>
          <div className="mx-auto mb-6 w-full rounded-xl p-6 text-gray-800 shadow-custom transform transition-transform duration-300 hover:-translate-y-[2px] hover:translate-x-[2px]">
            <div className="mb-4 flex w-full items-center">
              <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-50">
                <img src="https://i.pravatar.cc/100?img=4" alt="" />
              </div>
              <div className="flex-grow pl-3">
                <h6 className="text-sm font-bold uppercase text-gray-600">
                  Charlie Howse.
                </h6>
              </div>
              <div className="flex gap-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              </div>
            </div>
            <div className="w-full">
              <p className="text-sm leading-tight">
                <span className="mr-1 text-xl font-bold italic leading-none text-gray-400">
                  "
                </span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Architecto inventore voluptatum nostrum atque, corrupti, vitae
                esse id accusamus dignissimos neque reprehenderit natus, hic
                sequi itaque dicta nisi voluptatem! Culpa, iusto.
                <span className="ml-1 text-xl font-bold italic leading-none text-gray-400">
                  "
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="px-3 md:w-1/3">
          <div className="mx-auto mb-6 w-full rounded-xl p-6 text-gray-800 shadow-custom transform transition-transform duration-300 hover:-translate-y-[2px] hover:translate-x-[2px]">
            <div className="mb-4 flex w-full items-center">
              <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-50">
                <img src="https://i.pravatar.cc/100?img=5" alt="" />
              </div>
              <div className="flex-grow pl-3">
                <h6 className="text-sm font-bold uppercase text-gray-600">
                  Nevada Herbertson.
                </h6>
              </div>
              <div className="flex gap-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              </div>
            </div>
            <div className="w-full">
              <p className="text-sm leading-tight">
                <span className="mr-1 text-xl font-bold italic leading-none text-gray-400">
                  "
                </span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis,
                voluptatem porro obcaecati dicta, quibusdam sunt ipsum,
                laboriosam nostrum facere exercitationem pariatur deserunt
                tempora molestiae assumenda nesciunt alias eius? Illo, autem!
                <span className="ml-1 text-xl font-bold italic leading-none text-gray-400">
                  "
                </span>
              </p>
            </div>
          </div>
          <div className="mx-auto mb-6 w-full rounded-xl p-6 text-gray-800 shadow-custom transform transition-transform duration-300 hover:-translate-y-[2px] hover:translate-x-[2px]">
            <div className="mb-4 flex w-full items-center">
              <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-50">
                <img src="https://i.pravatar.cc/100?img=6" alt="" />
              </div>
              <div className="flex-grow pl-3">
                <h6 className="text-sm font-bold uppercase text-gray-600">
                  Kris Stanton.
                </h6>
              </div>
              <div className="flex gap-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              </div>
            </div>
            <div className="w-full">
              <p className="text-sm leading-tight">
                <span className="mr-1 text-xl font-bold italic leading-none text-gray-400">
                  "
                </span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptatem iusto, explicabo, cupiditate quas totam!
                <span className="ml-1 text-xl font-bold italic leading-none text-gray-400">
                  "
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* <p className=" items-center justify-center flex text-center mt-3">Join thousands of job seekers who’ve landed their dream jobs with our <br />AI resume builder. Transform your job search today!</p> */}
    </div>
    </div>
  );
};

export default Testimonials;
