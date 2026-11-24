# Alex's words → flags and ratings

## Before or during the session (brief flags)

| He says | Flag |
|---|---|
| болит / тянет / ноет / дискомфорт + поясница, спина внизу | `--pain lower_back` |
| … плечо | `--pain shoulder` |
| … локоть | `--pain elbow` |
| … колено | `--pain knee` |
| … запястье, кисть | `--pain wrist` |
| … шея | `--pain neck` |
| … бедро, таз, пах | `--pain hip` |
| плохо спал, устал, болею, нет сил, разбит, после перелёта | `--readiness low` |
| мало времени, есть 40 минут | `--time 40` |
| хочу спину / ноги / грудь | `--day pull` / `legs` / `push` |
| нет тренажёра X, занят X | swap X from `strength.pool`; if the gym never has it, add `"<id>": "<what instead>"` to gym.json `substitutions` |

Several pains: `--pain lower_back,knee`. Pain that sounds sharp, new or
spreading (a leg going numb, a sudden twinge under load): stop planning and
tell him to skip that area today and see a doctor if it persists; no plan
works around an injury.

## After the session (feedback ratings)

| He says about an exercise | rating | Next time (engine) |
|---|---|---|
| легко, изи, мог больше, лёгкий вес | `easy` | the weight rises one session sooner |
| норм, ок, нормально | `ok` | normal slow progression |
| тяжело, на пределе, еле, последний подход через силу | `hard` | weight held; twice in a row → one step back |
| не дожал, не сделал N повторов, сбросил вес | `fail` + note the reps | one step back |
| больно, тянуло, неприятно в … | `pain` + joint in note | exercise swapped next time |
| не делал, пропустил | `skipped` | no change |

Not said about an exercise = nothing recorded (it is not `ok`). A general
«всё норм» → `ok` for every strength exercise of that plan. Numbers he
names («на тяге взял 140 lb», «присед 3×6 на 255») go to `actual`, and the
next weights start from them. Crossfit time goes to `crossfit_time`.
