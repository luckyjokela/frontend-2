import { redirect } from "next/navigation";

export default function NewArrivalsPage() {
  redirect("/catalog");
  // или с фильтром: redirect("/catalog?sort=new")
}