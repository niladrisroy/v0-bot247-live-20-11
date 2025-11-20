import Link from "next/link" // Import Link
import { industrySolutionsContent } from "@/app/data/industry-solutions-content" // Import the content data
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function IndustrySolutions() {
  return (
    <section
      id="solutions"
      className="py-20 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 w-full"
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 space-y-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white">
          Solutions for Every Industry
        </h2>
        <p className="max-w-[900px] mx-auto text-center text-gray-700 dark:text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Our AI-powered chatbots are designed to adapt and excel across diverse business needs, driving efficiency and
          engagement.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industrySolutionsContent.map((solution, index) => {
            const IconComponent = solution.icon // Get the icon component
            return (
              <Link href={`/solutions/${solution.id}`} key={index} className="block">
                <Card className="border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] bg-white dark:bg-gray-800 h-full flex flex-col">
                  <CardHeader>
                    <div className="p-3 w-fit bg-purple-100 dark:bg-purple-900 rounded-full mb-4">
                      <IconComponent className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                      {solution.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-gray-700 dark:text-gray-300">{solution.description}</p>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
