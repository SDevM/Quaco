/**
 * Represents a user model instance
 */
export interface User {
	_id?: string
	name: string
	username: string
	email: string
	password: string
	address: string
	profile_pic: File | { key: string; link: string }
}
