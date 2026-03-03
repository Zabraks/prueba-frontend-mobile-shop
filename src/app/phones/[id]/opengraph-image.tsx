import { ImageResponse } from 'next/og';
import { phoneService } from '@/services/phone/phoneService';

export const alt = 'Phone details';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const phone = await phoneService.getPhoneById(id);

  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: '#000',
        color: '#fff',
        fontFamily: 'system-ui, sans-serif',
        padding: 60,
      }}
    >
      <span style={{ fontSize: 32, color: '#888', marginBottom: 16 }}>{phone.brand}</span>
      <span style={{ fontSize: 72, fontWeight: 700, marginBottom: 24, textAlign: 'center' }}>
        {phone.name}
      </span>
      <span style={{ fontSize: 48, color: '#0f0', fontWeight: 600 }}>{phone.basePrice} EUR</span>
    </div>,
    { ...size }
  );
}
