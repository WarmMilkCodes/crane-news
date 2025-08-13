export const metadata = {
    title: "Local Resources - Crane.news",
    description:
        "Quick links to local city services, utilities, schools, emergency contacts, and community resources."
}

type ResourceLink = {
    label: string;
    href: string;
    note?: string;      // helper text - hours, fees, etc
    external?: boolean; // defaults to true; internal links set to false
};

type ResourceSection = {
    title: string;
    tag?: string; // Small badge like "City", "County", "State"
    links: ResourceLink[];
};

const sections: ResourceSection[] = [
    {
        title: "City Services",
        tag: "City",
        links: [
            {
                label: "Pay City Utility Bill",
                href: "https://secure.cpteller.com/terminal/portal/?op=5ROuHHTbXPsj",
                note: "Official payment processor - opens in new tab"
            },
            {
                label: "City Hall - Contact & Hours",
                href: "https://crane-mo.com/",
                note: "Ordiances, utility bill payment, contact information"
            }
        ]
    },
    {
        title: "Utilities",
        tag: "Utilities",
        links: [
            {
                label: "Electrical Service",
                href: "https://crane-mo.com/",
                note: "Crane Public Works"
            },
            {
                label: "Water & Sewer",
                href: "https://crane-mo.com/",
                note: "Crane Public Works"
            },
            {
                label: "Trash Service",
                href: "https://www.republicservices.com/",
                note: "Contact City Hall with any questions or concerns"
            },
            {
                label: "Mediacom - Internet/TV/Phone",
                href: "https://mediacomcable.com/"
            },
            {
                label: "Brightspeed - Internet/Phone",
                href: "https://www.brightspeed.com/"
            }
        ]
    },
    {
        title: "Emergency & Public Safety",
        tag: "Safety",
        links: [
            {
                label: "Emergency - 911",
                href: "https://www.911.gov/",
                note: "Call 911 for emergencies"
            },
            {
                label: "Stone County Sheriff",
                href: "https://www.stonecountymosheriff.com/",
                note: "417-357-6116"
            },
            {
                label: "Crane Police Department",
                href: "https://crane-mo.com",
                note: "417-723-5000"
            }
        ]
    },
    {
        title: "Schools",
        tag: "Schools",
        links: [
            {
                label: "Crane R-III School District",
                href: "https://crane.k12.mo.us",
                note: "Calendars, lunch, athletics"
            },
            {
                label: "Lumen Parent Portal",
                href: "https://crane-mo.lumentouchhosts.com/light/lumen/signin",
                note: "Student lunch bill, grades"
            }
        ]
    },
    {
        title: "Churches",
        tag: "Churches",
        links: [
            {
              label: "Crane Bible Baptist Church",
              href: "https://www.facebook.com/CBBCmissouri/",
              note: "209 South Street"
            },
            {
                label: "Crane Christian Church",
                href: "https://www.facebook.com/ccccommunitybuilding/",
                note: "106 E. Edgewood Avenue"
            },
            {
                label: "Crane First Baptist",
                href: "http://www.fbccrane.org/",
                note: "30 Hallelujah Drive"
            },
            {
                label: "Crane Presbyterian Church",
                href: "https://www.pcusa.org/",
                note: "39322 MO-413"
            },
            {
                label: "Faith Chapel",
                href: "http://faithchapelofcranemo.com/",
                note: "201 East Avenue"
            },
            {
                label: "New Hope Assembly of God",
                href: "http://newhopecraneag.org/",
                note: "112 Main Street"
            },
            {
                label: "New Life Fellowship",
                href: "https://www.facebook.com/newlifefellowshipcrane/",
                note: "209 Leah Avenue"
            },
            {
                label: "The Gathering Church",
                href: "www.thegatheringchurchcrane.org",
                note: "39322 MO-413"
            }
        ]
    }
]


// small helper for external vs internal links
function OutLink({
  href,
  children,
  external = true,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  if (external ?? true) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-1 underline hover:no-underline"
      >
        {children}
        <span aria-hidden className="opacity-60 group-hover:opacity-100">↗</span>
      </a>
    );
  }
  return (
    <a href={href} className="group inline-flex items-center gap-1 underline hover:no-underline">
      {children}
    </a>
  );
}

export default function ResourcesPage() {
  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="h-serif text-2xl">Local Resources</h1>
        <p className="text-sm text-[var(--color-muted)]">
          Handy links to official services around Crane. Some links leave Crane.news.
        </p>
        <div className="panel p-3 text-xs text-[var(--color-muted)]">
          <strong>Note:</strong> Crane.news is not affiliated with any of the organizations listed below. Links to
          payments and services are provided for community convenience and open in a new tab.
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {sections.map((s) => (
          <section key={s.title} className="card p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="h-serif text-xl">{s.title}</h2>
              {s.tag && <span className="tag tag--gold">{s.tag}</span>}
            </div>

            <ul className="space-y-2">
              {s.links.map((l) => (
                <li key={l.label} className="flex flex-col">
                  <OutLink href={l.href} external={l.external ?? true}>
                    {l.label}
                  </OutLink>
                  {l.note && (
                    <span className="text-xs text-[var(--color-muted)]">{l.note}</span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </section>
  );
}
