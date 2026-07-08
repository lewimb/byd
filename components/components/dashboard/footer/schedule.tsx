import { FOOTER } from "@/lib/footer";

export default function FooterSchedule() {
  return (
    <>
      {/* <FooterSchedule /> */}
      <p className="font-semibold">Jam kerja</p>
      <div className="space-y-6">
        {FOOTER.workingHours.map((item) => (
          <div key={item.location}>
            <p>{item.location}</p>
            <div className="space-y-2 text-ink-muted">
              <p>{item.days}</p>
              <p>{item.hours}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
