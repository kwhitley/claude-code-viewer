export const sanitizeObject = (keysToRemove: string[]) => (obj: any) => {
	if (obj === null || typeof obj !== 'object') {
		return obj
	}

	if (Array.isArray(obj)) {
		return obj.map(sanitizeObject(keysToRemove))
	}

	const newObj: any = {}
	for (const key in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, key)) {
			if (keysToRemove.includes(key)) {
				continue
			}
			newObj[key] = sanitizeObject(keysToRemove)(obj[key])
		}
	}
	return newObj
}

export const whereObject = (filters: ((obj: any) => boolean)[]) => (obj: any) => {
	return filters.every((filter) => filter(obj))
}

import { stat } from 'fs/promises'
import { join } from 'path'

/**
 * Reconstructs a file path from a kebab-cased string by testing for filesystem existence.
 * e.g., "-Users-me-my-project" -> "/Users/me/my-project"
 * @param parts - The path components, split by '-', starting after the initial empty string.
 * @returns The reconstructed path, or null if it can't be determined.
 */
export const reconstructPathFromParts = async (
	parts: string[],
): Promise<string | null> => {
	// This is the recursive worker function
	async function find(
		base: string,
		currentParts: string[],
	): Promise<string | null> {
		// Base case: if there are no more parts, we've successfully built the path.
		if (currentParts.length === 0) {
			return base
		}

		// Iterate through possible next segments, from 1 part up to all remaining parts.
		for (let i = 1; i <= currentParts.length; i++) {
			const segment = currentParts.slice(0, i).join('-')
			const potentialPath = join(base, segment)

			try {
				// Check if this path segment actually exists on the filesystem.
				await stat(potentialPath)
				// If it exists, it's a valid directory. Recurse with the rest of the parts.
				const result = await find(potentialPath, currentParts.slice(i))
				if (result) {
					// A valid full path was found down the line, so we return it.
					return result
				}
			} catch (e) {
				// This path doesn't exist. The loop will continue to try a longer segment
				// (e.g. "my" failed, so next we'll try "my-app").
			}
		}

		// If no combination of parts forms a valid path from the current base.
		return null
	}

	// Start the search from the root directory.
	return find('/', parts)
}