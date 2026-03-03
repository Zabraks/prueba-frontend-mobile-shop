import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

const ColorSwatch = ({ name, cssVar }: { name: string; cssVar: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
    <div
      style={{
        width: '48px',
        height: '48px',
        backgroundColor: `var(${cssVar})`,
        border: '1px solid #ccc',
        borderRadius: '4px',
      }}
    />
    <div>
      <div style={{ fontWeight: 600, fontSize: '14px' }}>{name}</div>
      <code style={{ fontSize: '12px', color: '#666' }}>{cssVar}</code>
    </div>
  </div>
);

const SpacingBlock = ({ name, cssVar }: { name: string; cssVar: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
    <div
      style={{
        width: `var(${cssVar})`,
        height: '24px',
        backgroundColor: '#000',
        minWidth: '2px',
      }}
    />
    <div>
      <span style={{ fontWeight: 600, fontSize: '14px' }}>{name}</span>
      <code style={{ fontSize: '12px', color: '#666', marginLeft: '8px' }}>{cssVar}</code>
    </div>
  </div>
);

const TypographySample = ({
  name,
  cssVar,
  sample = 'The quick brown fox',
}: {
  name: string;
  cssVar: string;
  sample?: string;
}) => (
  <div style={{ marginBottom: '16px' }}>
    <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>
      <strong>{name}</strong> — <code>{cssVar}</code>
    </div>
    <div style={{ fontSize: `var(${cssVar})` }}>{sample}</div>
  </div>
);

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section style={{ marginBottom: '48px' }}>
    <h2
      style={{
        fontSize: '20px',
        fontWeight: 700,
        marginBottom: '24px',
        paddingBottom: '8px',
        borderBottom: '2px solid #000',
      }}
    >
      {title}
    </h2>
    {children}
  </section>
);

const DesignTokens = () => {
  return (
    <div style={{ fontFamily: 'var(--font-family)', padding: '24px', maxWidth: '900px' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px' }}>Design Tokens</h1>
      <p style={{ color: '#666', marginBottom: '48px' }}>
        Sistema de diseño basado en CSS Custom Properties para consistencia visual.
      </p>

      {/* Colors */}
      <Section title="🎨 Colors">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '24px',
          }}
        >
          <div>
            <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px', color: '#666' }}>
              Background & Surface
            </h3>
            <ColorSwatch name="Background" cssVar="--color-background" />
            <ColorSwatch name="Surface" cssVar="--color-surface" />
          </div>
          <div>
            <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px', color: '#666' }}>
              Text
            </h3>
            <ColorSwatch name="Primary" cssVar="--color-text-primary" />
            <ColorSwatch name="Secondary" cssVar="--color-text-secondary" />
            <ColorSwatch name="Disabled" cssVar="--color-text-disabled" />
          </div>
          <div>
            <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px', color: '#666' }}>
              Actions
            </h3>
            <ColorSwatch name="Action BG" cssVar="--color-action-bg" />
            <ColorSwatch name="Action Text" cssVar="--color-action-text" />
            <ColorSwatch name="Danger" cssVar="--color-danger" />
          </div>
          <div>
            <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px', color: '#666' }}>
              Borders
            </h3>
            <ColorSwatch name="Border" cssVar="--color-border" />
            <ColorSwatch name="Border Color" cssVar="--border-color" />
            <ColorSwatch name="Selected" cssVar="--border-color-selected" />
          </div>
        </div>
      </Section>

      <Section title="📝 Typography">
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '16px', color: '#666' }}>
            Font Sizes
          </h3>
          <TypographySample name="Extra Small" cssVar="--font-size-xs" />
          <TypographySample name="Small" cssVar="--font-size-sm" />
          <TypographySample name="Medium (Base)" cssVar="--font-size-md" />
          <TypographySample name="Large" cssVar="--font-size-lg" />
          <TypographySample name="Extra Large" cssVar="--font-size-xl" />
        </div>

        <div>
          <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '16px', color: '#666' }}>
            Font Weights
          </h3>
          <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
            <div>
              <span style={{ fontWeight: 'var(--font-weight-light)' as unknown as number }}>
                Light (300)
              </span>
              <code style={{ fontSize: '11px', color: '#666', display: 'block' }}>
                --font-weight-light
              </code>
            </div>
            <div>
              <span style={{ fontWeight: 'var(--font-weight-regular)' as unknown as number }}>
                Regular (400)
              </span>
              <code style={{ fontSize: '11px', color: '#666', display: 'block' }}>
                --font-weight-regular
              </code>
            </div>
            <div>
              <span style={{ fontWeight: 'var(--font-weight-bold)' as unknown as number }}>
                Bold (700)
              </span>
              <code style={{ fontSize: '11px', color: '#666', display: 'block' }}>
                --font-weight-bold
              </code>
            </div>
          </div>
        </div>
      </Section>

      <Section title="📐 Spacing">
        <SpacingBlock name="2XS (2px)" cssVar="--space-2xs" />
        <SpacingBlock name="XS (4px)" cssVar="--space-xs" />
        <SpacingBlock name="SM (8px)" cssVar="--space-sm" />
        <SpacingBlock name="MD (16px)" cssVar="--space-md" />
        <SpacingBlock name="LG (24px)" cssVar="--space-lg" />
        <SpacingBlock name="XL (32px)" cssVar="--space-xl" />
        <SpacingBlock name="2XL (40px)" cssVar="--space-2xl" />
        <SpacingBlock name="3XL (80px)" cssVar="--space-3xl" />
        <SpacingBlock name="5XL (200px)" cssVar="--space-5xl" />
      </Section>

      <Section title="🔲 Borders">
        <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                width: '80px',
                height: '80px',
                border: 'var(--border-width) solid var(--border-color)',
                marginBottom: '8px',
              }}
            />
            <div style={{ fontSize: '12px' }}>Regular (1px)</div>
            <code style={{ fontSize: '11px', color: '#666' }}>--border-width</code>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                width: '80px',
                height: '80px',
                border: 'var(--border-width-strong) solid var(--border-color-selected)',
                marginBottom: '8px',
              }}
            />
            <div style={{ fontSize: '12px' }}>Strong (2px)</div>
            <code style={{ fontSize: '11px', color: '#666' }}>--border-width-strong</code>
          </div>
        </div>
      </Section>
    </div>
  );
};

const meta = {
  title: 'Foundation/Design Tokens',
  component: DesignTokens,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Sistema de Design Tokens basado en CSS Custom Properties. Estos tokens garantizan consistencia visual en toda la aplicación.',
      },
    },
  },
} satisfies Meta<typeof DesignTokens>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {};
