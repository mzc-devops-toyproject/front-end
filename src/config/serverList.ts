import { Server } from '../lib/server'

export const ServerList: Server[] = [
  { name: 'gateway-service', url: new URL('https://gateway.moodi.today'), healthCheckPath: '/health-check' }
]