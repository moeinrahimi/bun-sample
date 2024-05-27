import { Type } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';

const envSchema = Type.Object({
  PORT: Type.String(),
  DATABASE_URL: Type.String(),
  
});
if (!Value.Check(envSchema, Bun.env)) throw new Error('Invalid env variables');
export const env = Value.Cast(envSchema, Bun.env);
