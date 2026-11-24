# Alex's words → flags, ratings, gym

## Before or during the session (brief flags)

| He says | Flag |
|---|---|
| болит / тянет / ноет / дискомфорт + поясница, спина внизу | `--pain lower_back` |
| … плечо · локоть · колено · запястье · шея · бедро, таз | `--pain shoulder` · `elbow` · `knee` · `wrist` · `neck` · `hip` |
| плохо спал, устал, болею, нет сил, разбит, джетлаг | `--readiness low` |
| переехал, давно не был (без жалоб на самочувствие) | no flag: the engine handles the pause |
| мало времени, есть 40 минут | `--time 40` |
| хочу спину / ноги / грудь | `--day pull` / `legs` / `push` |
| X занят, сегодня не работает | `--missing <id>` (today only, never `gym`) |
| (на вопрос о прошлой боли) нормально, прошло | `--ok <joint>` |

Several pains: `--pain lower_back,knee`. Sharp, new or spreading pain (a
leg going numb, a twinge under load): no plan; tell him to skip that area
today and see a doctor if it persists.

## After the session (feedback ratings)

| He says about an exercise | rating |
|---|---|
| легко, изи, мог больше | `easy` |
| норм, ок | `ok` |
| тяжело, на пределе, последний подход еле | `hard` |
| не дожал, не сделал N повторов, сбросил вес | `fail` + the reps in `note` |
| больно, тянуло, неприятно в … | `pain` + `joint` (lower_back, knee, shoulder, elbow, wrist, neck, hip) |
| не делал, пропустил | `skipped` |

Not mentioned = not recorded. «Всё норм» → `ok` for every strength exercise
of that plan. Weights he names («на тяге взял 140», «присед 3×6 на 255»)
→ `actual` in lb (or kg if he says кг); the next plan starts from them.
Crossfit time → `crossfit_time`.

## The gym

| He says | Command |
|---|---|
| нет Т-тяги / такого тренажёра нет | `gym --missing chest_supported_tbar` |
| есть тренажёр для махов одной рукой | `gym --have lateral_raise_1arm` |
| вместо X делаю Y | `gym --use X=Y` |
| нет скакалки / есть гребля | `gym --equip rope=missing` / `rower=have` |
