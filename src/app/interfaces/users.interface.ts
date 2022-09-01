/**
 * Represents a user model instance
 * @param {string} _id - The mongoose document id
 * @param {string} title - The title of the user
 * @param {string} name - The first name of the user
 * @param {string} surname - The last name of the user
 * @param {string} username  - The username of the user
 * @param {string} email  - The email of the user
 * @param {string} password  - The password of the user
 * @param {string} address  - The address of the user
 * @param {File} profile_pic  - The profile picture of the user
 */
export interface User {
	_id?: string
	title: string
	name: string
	surname: string
	username: string
	email: string
	password: string
	address: string
	profile_pic?: File
}

/**
 * Represents a user login submission instance
 * @param {string} email  - The email of the user
 * @param {string} password  - The password of the user
 */
export interface UserLogin {
	email: string
	password: string
}
