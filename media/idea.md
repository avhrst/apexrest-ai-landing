Ось готовий контент для вашого Markdown-файлу, що містить статтю двома мовами (українською та англійською) на основі наданих матеріалів:

```markdown
# Детермінований Vibe Coding: Поєднання ШІ-агентів із Low-Code платформами
*(English version below)*

**Детермінований Vibe Coding (Deterministic Vibe Coding) — це новий підхід до розробки програмного забезпечення, який поєднує творчу силу ШІ-агентів із суворою дисципліною зрілих low-code платформ**. 

### Проблема традиційного Vibe Coding
Хоча "vibe coding" (коли ви описуєте бажане, а ШІ-агент пише код) виглядає перспективно, він має серйозні проблеми при застосуванні в реальних продакшен-системах.
* **Безпека:** ШІ-агенти отримують занадто багато свободи і можуть випадково змінити схеми авторизації, налаштування автентифікації чи політики безпеки, оскільки не розуміють повних бізнес-вимог системи.
* **Командна робота:** Різні розробники, використовуючи ШІ, генерують код у абсолютно різних стилях, що робить його інтеграцію у великі існуючі проєкти надзвичайно складною.

Коренева причина цих проблем полягає в тому, що агентам надається необмежений доступ до коду без жодних запобіжників.

### Рішення за допомогою Low-Code
Low-code платформи, такі як Oracle APEX, розроблялися роками саме для вирішення цих проблем для людей. Вони функціонують, надаючи програмний API як посередницький шар, який суворо контролює правила. Розробник не може просто обійти глобальні налаштування безпеки; платформа не дозволяє йому відхилятися від заданих меж. Oracle розробляє цю детерміновану платформу вже понад 20 років.

### Прорив: Детермінований Vibe Coding
Справжній прорив полягає в тому, щоб **надати ШІ-агенту доступ не безпосередньо до коду, а до API, який надає low-code платформа**. Незалежно від стилю чи контексту агента, він виконує завдання, що повністю й миттєво інтегруються в систему та одразу готові до продакшену.

### Реальна демонстрація на базі Oracle APEX
Щоб довести цю концепцію, ШІ-агенту (Claude Code) доручили додати абсолютно новий модуль управління запасами до існуючого додатка Oracle APEX на 127 сторінок (Customer Tracker). Модуль мав завантажувати популярні товари з Amazon, шукати зображення та відстежувати інвентаризацію.

* **Що було створено:** Агент створив 3 нові таблиці в базі даних, PL/SQL пакет для взаємодії з Amazon та 6 нових APEX-сторінок, включаючи дашборд та інтерактивні звіти.
* **Як це було зроблено:** Все виконувалося через термінал (SQLcl) за допомогою детермінованого конвеєра "експорт-патч-імпорт". Агент ідеально відтворив наявні шаблони додатка, такі як генерація ID, колонки аудиту та схеми авторизації.
* **Виявлення помилок:** Коли ШІ припускався помилок (наприклад, неправильний параметр авторизації або використання SQLERRM у DML-запитах), детермінований рушій платформи одразу відхиляв їх, захищаючи додаток від поломок.

### Чому це важливо
Традиційна корпоративна розробка — повільна, а vibe coding — небезпечний. Детермінований Vibe Coding є одночасно **швидким і безпечним**. Згенерований ШІ модуль **нічим не відрізняється від того, що міг би створити досвідчений розробник вручну**, завдяки тому, що платформа автоматично забезпечує дотримання всіх стандартів.

---

# Deterministic Vibe Coding: Combining AI Agents with Low-Code Platforms

**Deterministic Vibe Coding is a new approach to building production software that combines the creative power of AI agents with the strict discipline of mature low-code platforms**.

### The Problem with Traditional Vibe Coding
While "vibe coding" (where you describe what you want and an AI agent writes the code) is exciting, it has serious flaws when applied to real production systems.
* **Safety:** AI agents have enormous freedom and can accidentally change authorization schemes, authentication settings, or security policies because they lack full understanding of business requirements.
* **Teamwork:** Different developers using AI will produce code in dramatically different styles, making it extremely difficult to integrate AI-generated code into large existing projects.

The root cause of both problems is that agents and developers are given unlimited access to code with no guardrails.

### The Low-Code Solution
Low-code platforms, like Oracle APEX, have been built over many years specifically to solve these problems for human developers. They provide a programmatic API as an intermediary layer that strictly controls the rules. A developer cannot bypass global security settings; the platform does not allow them to deviate from the application's boundaries. Oracle has been developing this highly deterministic platform for over 20 years.

### The Breakthrough: Deterministic Vibe Coding
The breakthrough is **giving the AI agent access to the API provided by the low-code platform, rather than directly to the code**. Regardless of the agent's style or context, it performs targeted tasks that fully integrate into the system and are production-ready immediately.

### A Real-World Demo: Oracle APEX
To demonstrate this concept, an AI agent (Claude Code) was used to add a completely new inventory module to an existing 127-page Oracle APEX application (Customer Tracker). The goal was to build a system that scrapes top-selling products from Amazon, stores them locally, and tracks inventory levels.

* **What was built:** The agent successfully built 3 new database tables, a PL/SQL package to sync Amazon data, and 6 new APEX pages (including an inventory dashboard and interactive transaction reports).
* **How it was built:** Everything was done through the CLI (SQLcl) using a strict export-patch-import workflow. The agent perfectly matched the existing application's patterns, including ID generation, audit columns, and authorization schemes.
* **Catching Errors:** When the AI agent made mistakes (such as using the wrong authorization parameter or placing SQLERRM directly in DML statements), the deterministic platform caught and rejected the errors at import time, preventing the AI from silently breaking the application.

### Why This Is Significant
Traditional enterprise development is slow, and traditional vibe coding is dangerous. Deterministic Vibe Coding is **both fast and safe**. The resulting module is **indistinguishable from what a skilled APEX developer would create manually**, because the platform's deterministic API enforces all best practices and standards.
```