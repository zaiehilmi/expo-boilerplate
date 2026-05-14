/**
 Untuk mencantikkan struktur JSON.

 ```
 // Sebelum:
 User: {name: "zaie", role: "mouse"}

 // Selepas:
 User: {
 name: "zaie",
 role: "mouse"
 }
 ```
 */

// biome-ignore lint/suspicious/noExplicitAny: sbb dia takde structure
export const prettifyJson = (data: any): string => JSON.stringify(data, null, 2)
