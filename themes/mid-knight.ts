import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const myCustomTheme: CustomThemeConfig = {
	name: 'mid-knight',
	properties: {
		// =~= Theme Properties =~=
		'--theme-font-family-base': `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace`,
		'--theme-font-family-heading': `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace`,
		'--theme-font-color-base': '0 0 0',
		'--theme-font-color-dark': '255 255 255',
		'--theme-rounded-base': '4px',
		'--theme-rounded-container': '6px',
		'--theme-border-base': '2px',
		// =~= Theme On-X Colors =~=
		'--on-primary': '255 255 255',
		'--on-secondary': '0 0 0',
		'--on-tertiary': '255 255 255',
		'--on-success': '255 255 255',
		'--on-warning': '255 255 255',
		'--on-error': '0 0 0',
		'--on-surface': '255 255 255',
		// =~= Theme Colors  =~=
		// primary | #3136e6
		'--color-primary-50': '224 225 251', // #e0e1fb
		'--color-primary-100': '214 215 250', // #d6d7fa
		'--color-primary-200': '204 205 249', // #cccdf9
		'--color-primary-300': '173 175 245', // #adaff5
		'--color-primary-400': '111 114 238', // #6f72ee
		'--color-primary-500': '49 54 230', // #3136e6
		'--color-primary-600': '44 49 207', // #2c31cf
		'--color-primary-700': '37 41 173', // #2529ad
		'--color-primary-800': '29 32 138', // #1d208a
		'--color-primary-900': '24 26 113', // #181a71
		// secondary | #fa6e86
		'--color-secondary-50': '254 233 237', // #fee9ed
		'--color-secondary-100': '254 226 231', // #fee2e7
		'--color-secondary-200': '254 219 225', // #fedbe1
		'--color-secondary-300': '253 197 207', // #fdc5cf
		'--color-secondary-400': '252 154 170', // #fc9aaa
		'--color-secondary-500': '250 110 134', // #fa6e86
		'--color-secondary-600': '225 99 121', // #e16379
		'--color-secondary-700': '188 83 101', // #bc5365
		'--color-secondary-800': '150 66 80', // #964250
		'--color-secondary-900': '123 54 66', // #7b3642
		// tertiary | #966c4a
		'--color-tertiary-50': '239 233 228', // #efe9e4
		'--color-tertiary-100': '234 226 219', // #eae2db
		'--color-tertiary-200': '229 218 210', // #e5dad2
		'--color-tertiary-300': '213 196 183', // #d5c4b7
		'--color-tertiary-400': '182 152 128', // #b69880
		'--color-tertiary-500': '150 108 74', // #966c4a
		'--color-tertiary-600': '135 97 67', // #876143
		'--color-tertiary-700': '113 81 56', // #715138
		'--color-tertiary-800': '90 65 44', // #5a412c
		'--color-tertiary-900': '74 53 36', // #4a3524
		// success | #5323ee
		'--color-success-50': '229 222 252', // #e5defc
		'--color-success-100': '221 211 252', // #ddd3fc
		'--color-success-200': '212 200 251', // #d4c8fb
		'--color-success-300': '186 167 248', // #baa7f8
		'--color-success-400': '135 101 243', // #8765f3
		'--color-success-500': '83 35 238', // #5323ee
		'--color-success-600': '75 32 214', // #4b20d6
		'--color-success-700': '62 26 179', // #3e1ab3
		'--color-success-800': '50 21 143', // #32158f
		'--color-success-900': '41 17 117', // #291175
		// warning | #35653d
		'--color-warning-50': '225 232 226', // #e1e8e2
		'--color-warning-100': '215 224 216', // #d7e0d8
		'--color-warning-200': '205 217 207', // #cdd9cf
		'--color-warning-300': '174 193 177', // #aec1b1
		'--color-warning-400': '114 147 119', // #729377
		'--color-warning-500': '53 101 61', // #35653d
		'--color-warning-600': '48 91 55', // #305b37
		'--color-warning-700': '40 76 46', // #284c2e
		'--color-warning-800': '32 61 37', // #203d25
		'--color-warning-900': '26 49 30', // #1a311e
		// error | #98afc5
		'--color-error-50': '240 243 246', // #f0f3f6
		'--color-error-100': '234 239 243', // #eaeff3
		'--color-error-200': '229 235 241', // #e5ebf1
		'--color-error-300': '214 223 232', // #d6dfe8
		'--color-error-400': '183 199 214', // #b7c7d6
		'--color-error-500': '152 175 197', // #98afc5
		'--color-error-600': '137 158 177', // #899eb1
		'--color-error-700': '114 131 148', // #728394
		'--color-error-800': '91 105 118', // #5b6976
		'--color-error-900': '74 86 97', // #4a5661
		// surface | #2f527e
		'--color-surface-50': '224 229 236', // #e0e5ec
		'--color-surface-100': '213 220 229', // #d5dce5
		'--color-surface-200': '203 212 223', // #cbd4df
		'--color-surface-300': '172 186 203', // #acbacb
		'--color-surface-400': '109 134 165', // #6d86a5
		'--color-surface-500': '47 82 126', // #2f527e
		'--color-surface-600': '42 74 113', // #2a4a71
		'--color-surface-700': '35 62 95', // #233e5f
		'--color-surface-800': '28 49 76', // #1c314c
		'--color-surface-900': '23 40 62' // #17283e
	}
};
