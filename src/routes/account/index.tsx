import { createFileRoute } from '@tanstack/react-router';
import { AccountPanel } from '@/components/AccountPanel';
import { meta } from '@/components/InfoPage';
export const Route = createFileRoute('/account/')({ head: () => meta('My Account', 'Your VALE preferences, addresses and orders.'), component: AccountPanel });