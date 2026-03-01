import { phoneService } from '@/services/phone/phoneService';
import { PhoneDetail } from '@/features/phoneDetail/PhoneDetail';

interface PhoneDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function PhoneDetailPage({ params }: PhoneDetailPageProps) {
  const { id } = await params;

  const data = await phoneService.getPhoneById(id);

  return (
    <main>
      <PhoneDetail data={data} />
    </main>
  );
}
