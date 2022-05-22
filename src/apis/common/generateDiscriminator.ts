import ShortUniqueId from 'short-unique-id';

const DISCRIMINATOR_LENGTH = 5;

/**
 * @param {number | undefined} length
 * @param {array<string> | undefined} dictionary
 * @returns {string}
 */
export default function generateDiscriminator(
    length: number = DISCRIMINATOR_LENGTH,
    dictionary: Array<string> = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
): string {
    const discriminator = new ShortUniqueId({
        length,
        dictionary,
    });
    return discriminator();
}
