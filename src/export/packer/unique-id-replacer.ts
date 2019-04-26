export class UniqueIdReplacer {
    public replace(xmlData: string): string {
        const counts = {};
        // Look for id="uId{name}" and replace each instance with a value
        // that is unique to all occurences of name.
        return xmlData.replace(
            /(\sid=")uId{([^}]+)}(")/g,
            // We use a spread args since the TS compiler wont let us have
            // a declared local variable that we don't use and we do not use
            // the first argument to this function.
            (...args) => args[1] + ((counts[args[2]] = (counts[args[2]] || 0) + 1) - 1) + args[3],
        );
    }
}
