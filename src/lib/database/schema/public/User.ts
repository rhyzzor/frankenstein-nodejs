// @generated
// This file is automatically generated by Kanel. Do not modify manually.

import type { ColumnType, Insertable, Selectable, Updateable } from "kysely";

/** Identifier type for public.user */
export type UserId = string & { __brand: "UserId" };

/** Represents the table public.user */
export default interface UserTable {
	id: ColumnType<UserId, UserId | undefined, UserId>;

	email: ColumnType<string, string, string>;

	password: ColumnType<string, string, string>;

	createdAt: ColumnType<Date, Date | string | undefined, Date | string>;

	updatedAt: ColumnType<Date, Date | string | undefined, Date | string>;

	name: ColumnType<string, string, string>;
}

export type User = Selectable<UserTable>;

export type NewUser = Insertable<UserTable>;

export type UserUpdate = Updateable<UserTable>;
