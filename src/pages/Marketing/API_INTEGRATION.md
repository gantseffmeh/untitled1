# Интеграция API для модуля Маркетинг

## Структура данных

Модуль ожидает данные в следующем формате:

```typescript
interface MarketingData {
    clicks: {
        summary: SummaryItem[];
        metrics: ClickMetric[];
    };
    conversions: {
        summary: SummaryItem[];
        metrics: ConversionMetric[];
    };
}
```

## Пример ответа API

```json
{
  "clicks": {
    "summary": [
      {
        "label": "Клики",
        "value": "Упало на 5%",
        "change": -5,
        "isPositive": false
      },
      {
        "label": "Клики в RSA",
        "value": "Упало на 83%",
        "change": -83,
        "isPositive": false
      },
      {
        "label": "Клики в MC",
        "value": "Выросло на 64%",
        "change": 64,
        "isPositive": true
      },
      {
        "label": "CTR в RSA",
        "value": "Упало на 40%",
        "change": -40,
        "isPositive": false
      },
      {
        "label": "CTR в MC",
        "value": "Упало на 3%",
        "change": -3,
        "isPositive": false
      }
    ],
    "metrics": [
      {
        "id": 1,
        "indicator": "Клики, кол-во",
        "october": 3063,
        "september": 3218,
        "august": 3085,
        "efficiency": -4.82
      },
      {
        "id": 2,
        "indicator": "Клики MC, кол-во",
        "october": 2855,
        "september": 1746,
        "august": 2023,
        "efficiency": 63.52
      }
    ]
  },
  "conversions": {
    "summary": [...],
    "metrics": [...]
  }
}
```

## Как подключить API

1. Откройте файл `src/pages/Marketing/Marketing.tsx`
2. Найдите функцию `loadMarketingData` в `useEffect`
3. Замените код загрузки данных:

```typescript
const loadMarketingData = async () => {
    try {
        setLoading(true);
        
        // Замените на ваш API endpoint
        const response = await fetch('/api/marketing', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Добавьте заголовки авторизации, если нужно
                // 'Authorization': `Bearer ${token}`
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const apiData: MarketingData = await response.json();
        setData(apiData);
        setLoading(false);
    } catch (error) {
        console.error('Error loading marketing data:', error);
        setLoading(false);
        // Можно добавить обработку ошибок (показать уведомление пользователю)
    }
};
```

## Поля данных

### SummaryItem
- `label` - Название метрики (например, "Клики")
- `value` - Текстовое описание изменения (например, "Упало на 5%")
- `change` - Числовое значение изменения в процентах (-5, 64, и т.д.)
- `isPositive` - Является ли изменение положительным для бизнеса
  - `true` - для метрик, где увеличение = хорошо (клики, конверсии)
  - `false` - для метрик, где увеличение = плохо (CPA, отказы)

### ClickMetric / ConversionMetric
- `id` - Уникальный идентификатор строки
- `indicator` - Название показателя
- `october` - Значение за октябрь (число или строка с %)
- `september` - Значение за сентябрь
- `august` - Значение за август
- `efficiency` - Изменение в процентах от сентября к октябрю

## Логика цветов

- **Зеленый** - положительное изменение для "хороших" метрик (клики, конверсии растут)
- **Красный** - отрицательное изменение для "хороших" метрик или положительное для "плохих" (CPA растет)
- **Нейтральный** - нет изменений (0%)

## Примечания

- Все вычисления (efficiency, summary) должны выполняться на backend
- Frontend только отображает полученные данные
- Форматирование чисел происходит автоматически (разделители тысяч, проценты)

