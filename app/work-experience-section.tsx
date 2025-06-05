import Image from "next/image"

export default function WorkExperienceSection() {
  const workExperience = [
    {
      title: "CIB on the Mobile",
      description: "Take your client onboard seamlessly by our amazing tool of digital onboard process.",
      icon: "/placeholder.svg?height=80&width=80",
    },
    {
      title: "CIB on the Mobile",
      description: "Take your client onboard seamlessly by our amazing tool of digital onboard process.",
      icon: "/placeholder.svg?height=80&width=80",
    },
    {
      title: "CIB on the Mobile",
      description: "Take your client onboard seamlessly by our amazing tool of digital onboard process.",
      icon: "/placeholder.svg?height=80&width=80",
    },
    {
      title: "CIB on the Mobile",
      description: "Take your client onboard seamlessly by our amazing tool of digital onboard process.",
      icon: "/placeholder.svg?height=80&width=80",
    },
  ]

  return (
    <section className="py-24">
      <h2 className="text-5xl font-bold mb-16">Work Experience</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {workExperience.map((work, index) => (
          <div key={index} className="bg-[#1a0e3d]/50 rounded-3xl p-8 border border-purple-500/20 backdrop-blur-sm">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 relative">
                <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-md"></div>
                <div className="relative z-10 w-full h-full rounded-full bg-[#1a0e3d] flex items-center justify-center overflow-hidden">
                  <Image
                    src={work.icon || "/placeholder.svg"}
                    alt={work.title}
                    width={80}
                    height={80}
                    className="object-cover"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">{work.title}</h3>
                <p className="text-gray-300 mb-4">{work.description}</p>
                <button className="px-6 py-2 border border-purple-500 rounded-full text-sm hover:bg-purple-500/20 transition-colors">
                  LEARN MORE
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
