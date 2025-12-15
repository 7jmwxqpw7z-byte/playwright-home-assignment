## Purpose

This file gives actionable, repository-specific guidance for AI coding agents working on this Playwright test suite.

## Big picture
- **Architecture:** This is a Playwright-based E2E test project using a page-object pattern under `src/pages`. Tests live under `tests/` and call page objects to interact with the UI. Some older tests (e.g., `scenario.spec.ts`) directly use `page.locator` with XPath, but newer ones (e.g., `scenario-2.spec.ts`) use page objects for better encapsulation.
- **Key directories:** `src/pages/ui-controls` (shared UI components), `src/pages/features` (feature-specific pages), `tests/` (Playwright specs).
- **Why this shape:** Encapsulation via small Locator-backed page objects (see `LoginPage.of(locator)` factory pattern) keeps tests readable and re-usable. Page objects scope selectors to their locator, reducing brittleness.

## Important patterns to follow
- **Page object factory:** Page objects use a `static of(locator: Locator)` factory and store a `private readonly locator: Locator`. Example: `src/pages/ui-controls/login-page.ts`.
- **Locator usage:** Methods call `this.locator.locator(<xpath>)` to scope selectors. Maintain scoping when adding new methods. Avoid direct `page.locator` in tests; use page objects.
- **Selectors:** Codebase heavily uses XPath selectors (see `tests/scenario.spec.ts` and `src/pages/*`). When changing selectors, prefer minimal, stable attributes, but mirror the project's XPath-first style unless refactoring broadly. Watch for typos (e.g., extra `]` in `iga-ticket-creation-page.ts`).
- **Assertions:** Use Playwright `expect(...)` inside page objects for page-level checks (see `content-section-page.ts`). Keep assertions encapsulated in page objects.
- **Test structure:** Prefer page objects over direct locators for new tests. Use `test.step` for grouping actions in tests (see `scenario-2.spec.ts`).

## Developer workflows & commands
- **Run tests:** No `scripts` are defined in `package.json`. Use the Playwright CLI from the repo root, for example:

  npx playwright test --project=chromium tests/*.spec.ts

  For focused runs: npx playwright test tests/scenario-2.spec.ts --project=chromium

- **Config note:** `playwright.config.ts` sets `testDir: './e2e'` but specs are under `tests/`. The `testMatch: ['tests/*.spec.ts']` in the chromium project overrides this, but consider updating `testDir` to `'./tests'` for consistency.

## Project-specific conventions & gotchas
- **Method names vs tests:** Tests expect higher-level methods (e.g., `selectTeam`, `selectCustomer`, `saveTicket`) on `IgaTicketCreationPage` but some may have typos or missing implementations (see `src/pages/features/iga-ticket-creation-page/iga-ticket-creation-page.ts`). When implementing, match the names used by tests exactly.
- **Selector typos:** There are selector typos (e.g., `//li[@data-value='${ticketType}']']` with extra `]`) — run TypeScript and tests after edits.
- **Hard-coded credentials & external URL:** Tests navigate to `https://qatestenv.efectecloud-demo.com/itsm` and include plaintext credentials in specs. Avoid committing secrets; move credentials to `.env` and update tests to read from `process.env` if changing auth flows.
- **Mixed test styles:** Some tests use page objects (e.g., `scenario-2.spec.ts`), others direct locators (e.g., `scenario.spec.ts`). Prefer page objects for new tests.
- **No npm scripts or CI hooks:** Add `scripts` like `"test": "playwright test"` if you want convenient commands for contributors/CI.
- **Class naming:** Some files have mismatched class names (e.g., `content-section-page.ts` exports `ContextSectionPage`). Use the exported name in imports.

## Integration points & external dependencies
- **External app under test:** Tests run against a hosted test environment (see `tests/*.spec.ts`). Be mindful of network flakiness and consider adding retries or mocks if introducing more brittle checks.
- **Playwright version:** Project depends on `@playwright/test` and `playwright` v1.57.0 (see `package.json`). Use matching Playwright CLI for local runs.

## Guidance for edits & PRs
- **Small, focused changes:** When updating page objects, preserve the `of(locator)` factory and keep locators scoped to the instance.
- **Sync tests and page objects:** If tests call a method, ensure that exact method exists on the page object (name/signature). Update tests OR page objects — do not change both without updating the other.
- **Run tests locally:** After changes, run a focused test (single spec) with `npx playwright test tests/scenario-2.spec.ts --project=chromium` to validate behavior before opening a PR.

## Files to inspect for examples
- Login & auth: `src/pages/ui-controls/login-page.ts`
- Toolbar: `src/pages/ui-controls/iga-tool-bar-page.ts`
- Menu & navigation: `src/pages/ui-controls/menu-section-page.ts`
- Ticket creation: `src/pages/features/iga-ticket-creation-page/iga-ticket-creation-page.ts`
- Representative tests: `tests/scenario-1.spec.ts` and `tests/scenario-2.spec.ts` (page object usage), `tests/scenario.spec.ts` (direct locators)

## When unsure
- Prefer minimal, surgical fixes (matching existing conventions). If you propose a broad refactor (XPath selectors → data-test attributes, or switching to CSS selectors), open a design PR describing the migration and update a small feature end-to-end.

---
If anything in this guidance is unclear or you want me to expand a section (for example: a migration plan to data-* attributes, or adding `npm` scripts/CI config), tell me which area and I will iterate.
