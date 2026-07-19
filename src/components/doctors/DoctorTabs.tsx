import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function DoctorTabs({ doctor }: { doctor: any }) {
  return (
    <section className="container mx-auto mt-8 px-4 md:px-8">
      <div className="rounded-3xl bg-white shadow-refined border border-gray-100">
        <div className="border-b border-gray-100 px-4 pt-4 md:px-8 md:pt-6">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="bg-transparent flex flex-wrap gap-2 rounded-none p-0 h-auto items-start">
              <TabsTrigger
                value="overview"
                className="flex-none data-[state=active]:bg-[#003D52] data-[state=active]:text-white rounded-full px-4 py-2 text-xs md:text-sm"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="membership"
                className="flex-none data-[state=active]:bg-[#003D52] data-[state=active]:text-white rounded-full px-4 py-2 text-xs md:text-sm"
              >
                Fellowship Membership
              </TabsTrigger>
              <TabsTrigger
                value="expertise"
                className="flex-none data-[state=active]:bg-[#003D52] data-[state=active]:text-white rounded-full px-4 py-2 text-xs md:text-sm"
              >
                Field of Expertise
              </TabsTrigger>
              <TabsTrigger
                value="languages"
                className="flex-none data-[state=active]:bg-[#003D52] data-[state=active]:text-white rounded-full px-4 py-2 text-xs md:text-sm"
              >
                Languages Spoken
              </TabsTrigger>
              <TabsTrigger
                value="awards"
                className="flex-none data-[state=active]:bg-[#003D52] data-[state=active]:text-white rounded-full px-4 py-2 text-xs md:text-sm"
              >
                Awards & Achievements
              </TabsTrigger>
            </TabsList>

            <div className="border-t border-gray-100 px-4 py-5 md:px-8 md:py-6">
              <TabsContent value="overview">
                <h2 className="mb-3 text-base font-semibold text-[#003D52]">
                  Overview of {doctor.name}
                </h2>
                <div className="space-y-3 text-sm text-gray-700">
                  {doctor.overview.map((paragraph: string) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="membership">
                <h2 className="mb-3 text-base font-semibold text-[#003D52]">
                  Fellowships & Memberships of {doctor.name}
                </h2>
                <ul className="space-y-2 text-sm text-gray-700">
                  {doctor.fellowshipMembership.map((item: string) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#1F4FD8]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </TabsContent>

              <TabsContent value="expertise">
                <h2 className="mb-3 text-base font-semibold text-[#003D52]">
                  Field of Expertise: {doctor.name}
                </h2>
                <ul className="space-y-2 text-sm text-gray-700">
                  {doctor.fieldOfExpertise.map((item: string) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#1ECAD3]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </TabsContent>

              <TabsContent value="languages">
                <h2 className="mb-3 text-base font-semibold text-[#003D52]">
                  Languages Spoken by {doctor.name}
                </h2>
                <div className="flex flex-wrap gap-2 text-sm text-gray-700">
                  {doctor.languagesSpoken.map((lang: string) => (
                    <span
                      key={lang}
                      className="rounded-full bg-[#F3F7FA] px-3 py-1"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="awards">
                <h2 className="mb-3 text-base font-semibold text-[#003D52]">
                  Awards & Achievements of {doctor.name}
                </h2>
                <ul className="space-y-2 text-sm text-gray-700">
                  {doctor.awardsAchievements.map((item: string) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#FFB703]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
