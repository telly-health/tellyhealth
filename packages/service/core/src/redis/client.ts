import Redis, { RedisOptions } from 'ioredis'

export interface RedisClientOptions {
	host: string
	port: number
	password?: string
}

export function createRedisClient({
	host,
	port,
	password,
}: RedisClientOptions): Redis.Redis {
	const options: RedisOptions = {
		host,
		port,
	}

	if (password != null) {
		options.password = password
	}

	return new Redis(options)
}
