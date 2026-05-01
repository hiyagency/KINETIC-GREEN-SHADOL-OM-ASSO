import { AdminCard } from "@/components/admin/AdminShell";
import { GalleryUploader } from "@/components/admin/AdminForms";
import { getGallery } from "@/lib/data/queries";

export default async function AdminGalleryPage() {
  const gallery = await getGallery();
  return <AdminCard title="Gallery uploader"><GalleryUploader items={gallery} /></AdminCard>;
}
