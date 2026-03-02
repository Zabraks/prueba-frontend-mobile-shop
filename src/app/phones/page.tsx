import { phoneService } from '@/services/phone/phoneService';
import { PhoneList } from '@/features/phoneList/PhoneList/PhoneList';
import { API_CONFIG } from '@/config/api';
import { Suspense } from 'react';

interface PhonesPageProps {
  readonly searchParams: Promise<{ search?: string }>;
}

export default async function PhonesPage({ searchParams }: PhonesPageProps) {
  const { search } = await searchParams;

  const initialPhones = await phoneService.getPhoneList(
    search ? { search } : { limit: API_CONFIG.defaultLimit }
  );

  return (
    <main>
      <Suspense fallback={null}>
        <PhoneList initialPhones={initialPhones} />
      </Suspense>
    </main>
  );
}
