import { createFileRoute } from '@tanstack/react-router';
import { AuthForm } from '@/components/AuthForm';
import { meta } from '@/components/InfoPage';
export const Route = createFileRoute('/reset-password')({ head: () => meta('New Password', 'Set a new password for your VALE account.'), component: () => <AuthForm mode="reset" /> });