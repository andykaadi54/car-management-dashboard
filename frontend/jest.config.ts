export default {
	verbose: true,
	preset: "ts-jest",
	testEnvironment: "jest-environment-jsdom",
	transform: {
		"^.+\\.tsx?$": "ts-jest"
	},
	rootDir: "src",
	moduleNameMapper: {
		"\\.(gif|ttf|eot|svg|png)$": "<rootDir>/test/__mocks__/fileMock.js",
		"^@app/(.*)$": "<rootDir>/$1",
		"\\.(css)$": "identity-obj-proxy"
	}
};