import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { HighlightText } from "../components/core/HomePage/HighlightText";
import { Button } from "../components/core/HomePage/Button";
import Banner from "../assets/Images/banner.mp4";
import { CodeBlocks } from "../components/core/HomePage/CodeBlocks";
import { TimelineSection } from "../components/core/HomePage/TimelineSection";
import { LearningLanguageSection } from "../components/core/HomePage/LearningLanguageSection";
import { InstructorSection } from "../components/core/HomePage/InstructorSection";
import Footer from "../components/common/Footer";
import { ExploreMore } from "../components/core/HomePage/ExploreMore";
import ReviewSlider from "../components/common/ReviewSlider";

export const Home = () => {
  return (
    <div>
      {/* section 1 */}
      <div className="group relative mx-auto flex flex-col w-11/12 items-center text-white            justify-evenly lg:justify-between">
        <div className="flex flex-col gap-[38px]">
          {/* Intro section */}
          <div className="max-w-[913px] max-h-[276px] mx-auto gap-9 flex flex-col">
            <Link to="/signup">
              <div className="mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit hover:bg-richblack-900">
                <div className="flex items-center gap-2 rounded-full px-10 py-[5px] shadow shadow-richblack-200">
                  <p>Become an Instructor</p>
                  <FaArrowRight />
                </div>
              </div>
            </Link>

            <div className="text-center text-4xl font-semibold flex flex-col gap-4">
              <div>
                Empower Your Future With
                <HighlightText text={"Coding Skills"} />
              </div>

              <div className="mt-4 text-center text-[16px] font-medium leading-6 text-richblack-300">
                With our online coding courses, you can learn at your own pace,
                from anywhere in the world,and get access to a wealth of
                resources, including hands-on projects, quizzes, and
                personalized feedback from instructors.
              </div>
            </div>

            <div className="flex gap-6 mx-auto">
              <Button active={true} linkto={"/signup"}>
                Learn More
              </Button>

              <Button active={false} linkto={"/login"}>
                Book a Demo
              </Button>
            </div>
          </div>
          {/* video section */}
          <div className="shadow-2xl shadow-blue-200 mx-3 xs:my-40 sm:my-40 md:my-28 mt-[70%] max-w-[1035px] max-h-[515px]">
            <video
              className="shadow-[20px_20px_rgba(255,255,255)]"
              muted
              loop
              autoPlay
            >
              <source src={Banner} type="video/mp4" />
            </video>
          </div>
        </div>

        {/* code section 1 */}
        <div>
          <CodeBlocks
            position={"flex-col lg:flex-row"}
            heading={
              <div className="text-4xl font-semibold">
                Unlock Your
                <HighlightText text={"Coding Potential "} />
                With Our Online courses
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            btn1={{
              btnText: "Try it yourself",
              linkto: "/signup",
              active: true,
            }}
            btn2={{
              btnText: "Learn More",
              linkto: "/signup",
              active: false,
            }}
            codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
            codeColor={"text-yellow-25"}
            backgroundGradient={<div className="codeblock1 absolute"></div>}
          />
        </div>

        {/* code section 2 */}
        <div>
          <CodeBlocks
            position={"flex-col-reverse lg:flex-row-reverse"}
            heading={
              <div className="w-full text-4xl font-semibold">
                Start
                <HighlightText text={"coding in seconds"} />
              </div>
            }
            subheading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            btn1={{
              btnText: "Continue Lesson",
              linkto: "/signup",
              active: true,
            }}
            btn2={{
              btnText: "Learn More",
              linkto: "/signup",
              active: false,
            }}
            codeblock={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
            codeColor={"text-white"}
            backgroundGradient={<div className="codeblock2 absolute"></div>}
          />
        </div>

        <ExploreMore />
      </div>

      {/* section 2 */}
      <div className="bg-pure-greys-5 text-richblack-700">
        <div className="homepage_bg h-[310px]">
          <div className="w-11/12 max-w-maxContent flex flex-col items-center justify-end pb-20 gap-5 mx-auto h-full">
            <div className="flex gap-7 text-white ">
              <Button active={true} linkto={"/signup"}>
                <div className="flex items-center gap-3">
                  Explore Full Catalog
                  <FaArrowRight />
                </div>
              </Button>
              <Button active={false} linkto={"/signup"}>
                <div>Learn More</div>
              </Button>
            </div>
          </div>
        </div>

        <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7">
          <div className="flex flex-col xs:flex-row justify-evenly mb-10 mt-[95px] gap-3 xs:gap-0">
            <div className="text-4xl font-semibold xs:w-[45%]">
              Get the Skills you need for a
              <HighlightText text={"Job that is in demand"} />
            </div>

            <div className="flex flex-col gap-10 xs:w-[40%] items-start">
              <div className="text-[16px]">
                The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </div>
              <Button active={true} linkto={"/signup"}>
                Learn More
              </Button>
            </div>
          </div>

          {/* time line section */}
          <TimelineSection />

          {/* learning section */}
          <LearningLanguageSection />
        </div>
      </div>

      {/* section 3 */}
      <div>
        <div className="flex flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
          <InstructorSection />

          <h2 className="text-center text-4xl font-semibold mt-10">
            Review from Other Learners
          </h2>
          {/* review slider */}
          <div className="w-full">
            <ReviewSlider />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="my-20">
        <Footer />
      </div>
    </div>
  );
};
