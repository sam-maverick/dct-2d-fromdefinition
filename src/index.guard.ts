/*
 * Generated type guards for "index.ts".
 * WARNING: Do not manually change this file.
 */
import { Convention } from "./index";

export function isConvention(obj: unknown): obj is Convention {
    const typedObj = obj as Convention
    return (
        (typedObj === "orthogonal_unitary" ||
            typedObj === "unnormalized_forward")
    )
}
