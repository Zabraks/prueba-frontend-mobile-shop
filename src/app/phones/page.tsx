import { phoneService } from '@/services/phone/phoneService';
import { PhoneList } from '@/features/phoneList/PhoneList/PhoneList';

export default async function PhonesPage() {
  const initialPhones = await phoneService.getPhoneList({ limit: 20 });

  return (
    <main>
      <PhoneList initialPhones={initialPhones} />
    </main>
  );
}
