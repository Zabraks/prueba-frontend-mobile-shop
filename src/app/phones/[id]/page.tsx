import { phoneService } from '@/services/phone/phoneService';
import { PhoneDetail } from '@/features/phoneDetail/PhoneDetail';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface PhoneDetailPageProps {
  readonly params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PhoneDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const phone = await phoneService.getPhoneById(id);

  if (!phone) {
    notFound();
  }

  return {
    title: phone.name,
    description: phone.description,
  };
}

export async function generateStaticParams() {
  const phones = await phoneService.getPhoneList();
  return phones.map((item) => ({ id: item.id }));
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
