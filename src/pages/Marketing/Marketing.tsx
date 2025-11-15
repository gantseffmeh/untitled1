import React, { useState, useEffect } from 'react';
import './Marketing.css';
import { MarketingData } from '../../types/marketing';

const Marketing: React.FC = () => {
    const [data, setData] = useState<MarketingData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // Загрузка данных через API
    useEffect(() => {
        const loadMarketingData = async () => {
            try {
                setLoading(true);
                // TODO: Замените на ваш API endpoint
                // Пример:
                // const response = await fetch('/api/marketing');
                // if (!response.ok) throw new Error('Failed to fetch');
                // const apiData = await response.json();
                // setData(apiData);
                
                // Временные данные для демонстрации (удалите после подключения API)
                const mockData: MarketingData = {
            clicks: {
                summary: [
                    { label: 'Клики', value: 'Упало на 5%', change: -5, isPositive: false },
                    { label: 'Клики в RSA', value: 'Упало на 83%', change: -83, isPositive: false },
                    { label: 'Клики в MC', value: 'Выросло на 64%', change: 64, isPositive: true },
                    { label: 'CTR в RSA', value: 'Упало на 40%', change: -40, isPositive: false },
                    { label: 'CTR в MC', value: 'Упало на 3%', change: -3, isPositive: false },
                ],
                metrics: [
                    { id: 1, indicator: 'Клики, кол-во', october: 3063, september: 3218, august: 3085, efficiency: -4.82 },
                    { id: 2, indicator: 'Клики MC, кол-во', october: 2855, september: 1746, august: 2023, efficiency: 63.52 },
                    { id: 3, indicator: 'Клики RSA, кол-во', october: 208, september: 1185, august: 581, efficiency: -82.45 },
                    { id: 4, indicator: 'CTR, %', october: '0.64%', september: '0.90%', august: '0.37%', efficiency: -28.89 },
                    { id: 5, indicator: 'CTR MC, %', october: '0.62%', september: '0.64%', august: '0.58%', efficiency: -3.13 },
                    { id: 6, indicator: 'CTR RSA, %', october: '0.88%', september: '1.46%', august: '1.21%', efficiency: -39.73 },
                ],
            },
            conversions: {
                summary: [
                    { label: 'Конверсии', value: 'Упало на 50%', change: -50, isPositive: false },
                    { label: 'Конверсии в RSA', value: 'Упало на 100%', change: -100, isPositive: false },
                    { label: 'Конверсии в MC', value: 'Упало на 5%', change: -5, isPositive: false },
                    { label: 'CPA', value: 'Выросло на 86%', change: 86, isPositive: false },
                    { label: 'CPA в MC', value: 'Выросло на 133%', change: 133, isPositive: false },
                ],
                metrics: [
                    { id: 1, indicator: 'Конверсии, кол-во', october: 36, september: 72, august: 56, efficiency: -50.00 },
                    { id: 2, indicator: 'Конверсии MC, кол-во', october: 36, september: 38, august: 25, efficiency: -5.26 },
                    { id: 3, indicator: 'Конверсии RSA, кол-во', october: 0, september: 7, august: 2, efficiency: -100.00 },
                    { id: 4, indicator: 'CPA (средняя цена конверсии), руб', october: 5468.35, september: 2941.65, august: 3262.05, efficiency: 85.89 },
                    { id: 5, indicator: 'CPA MC, руб', october: 5468.35, september: 2350.97, august: 3322.29, efficiency: 132.60 },
                    { id: 6, indicator: 'CPA RSA, руб', october: 0.00, september: 9000.00, august: 14000.00, efficiency: -100.00 },
                ],
            },
        };

                // Имитация загрузки данных (удалите после подключения API)
                setTimeout(() => {
                    setData(mockData);
                    setLoading(false);
                }, 500);
                
                // После подключения API используйте:
                // setData(apiData);
                // setLoading(false);
            } catch (error) {
                console.error('Error loading marketing data:', error);
                setLoading(false);
                // Можно добавить обработку ошибок
            }
        };

        loadMarketingData();
    }, []);

    const formatValue = (value: number | string): string => {
        if (typeof value === 'number') {
            // Если значение уже содержит %, возвращаем как есть
            if (String(value).includes('%')) {
                return String(value);
            }
            // Форматируем числа с разделителями тысяч
            return value.toLocaleString('ru-RU', { 
                minimumFractionDigits: value % 1 === 0 ? 0 : 2, 
                maximumFractionDigits: 2 
            });
        }
        return value;
    };

    const formatEfficiency = (value: number): string => {
        if (value === 0) return '0.00%';
        const sign = value > 0 ? '+' : '';
        return `${sign}${value.toFixed(2)}%`;
    };

    // Определяем, является ли метрика "хорошей" (увеличение = хорошо)
    const isPositiveMetric = (indicator: string): boolean => {
        const positiveMetrics = [
            'Клики',
            'Клики MC',
            'CTR',
            'Конверсии',
            'Конверсии MC',
            'Конверсии RSA',
        ];
        return positiveMetrics.some(metric => indicator.includes(metric));
    };

    // Для CPA увеличение = плохо
    const isCostMetric = (indicator: string): boolean => {
        return indicator.includes('CPA');
    };

    const getEfficiencyClass = (value: number, indicator: string): string => {
        if (value === 0) return 'efficiency-neutral';
        
        if (isCostMetric(indicator)) {
            // Для CPA увеличение = плохо (красный), уменьшение = хорошо (зеленый)
            return value > 0 ? 'efficiency-negative' : 'efficiency-positive';
        }
        
        const isPositive = isPositiveMetric(indicator);
        if (isPositive) {
            return value > 0 ? 'efficiency-positive' : 'efficiency-negative';
        } else {
            return value > 0 ? 'efficiency-negative' : 'efficiency-positive';
        }
    };

    const getSummaryArrow = (change: number): string => {
        if (change === 0) return '';
        return change > 0 ? '↑' : '↓';
    };

    const getSummaryArrowClass = (change: number, isPositive: boolean): string => {
        if (change === 0) return 'summary-arrow-neutral';
        // Для CPA и других "плохих" метрик увеличение = красный
        if (!isPositive && change > 0) return 'summary-arrow-negative';
        if (isPositive && change > 0) return 'summary-arrow-positive';
        return 'summary-arrow-negative';
    };

    if (loading) {
        return (
            <div className="marketing-page">
                <div className="marketing-header">
                    <h1 className="page-title">Маркетинг</h1>
                </div>
                <div className="loading-message">Загрузка данных...</div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="marketing-page">
                <div className="marketing-header">
                    <h1 className="page-title">Маркетинг</h1>
                </div>
                <div className="error-message">Ошибка загрузки данных</div>
            </div>
        );
    }

    return (
        <div className="marketing-page">
            <div className="marketing-header">
                <h1 className="page-title">Маркетинг</h1>
            </div>

            {/* Секция Клики */}
            <div className="marketing-section">
                <div className="section-header">
                    <h2 className="section-title">Клики</h2>
                </div>
                <div className="section-content">
                    <div className="summary-list">
                        {data.clicks.summary.map((item, index) => (
                            <div key={index} className="summary-item">
                                <span className="summary-label">{item.label}</span>
                                <div className={`summary-value ${getSummaryArrowClass(item.change, item.isPositive)}`}>
                                    <span className={`summary-arrow ${getSummaryArrowClass(item.change, item.isPositive)}`}>
                                        {getSummaryArrow(item.change)}
                                    </span>
                                    <span className="summary-text">{item.value}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="metrics-table-container">
                        <table className="metrics-table">
                            <thead>
                                <tr>
                                    <th>№ п/п</th>
                                    <th>Показатель</th>
                                    <th>Октябрь</th>
                                    <th>Сентябрь</th>
                                    <th>Август</th>
                                    <th>Эффективность, %</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.clicks.metrics.map((metric) => (
                                    <tr key={metric.id}>
                                        <td className="row-number">{metric.id}</td>
                                        <td className="indicator-cell">{metric.indicator}</td>
                                        <td>{formatValue(metric.october)}</td>
                                        <td>{formatValue(metric.september)}</td>
                                        <td>{formatValue(metric.august)}</td>
                                        <td className={`efficiency ${getEfficiencyClass(metric.efficiency, metric.indicator)}`}>
                                            {formatEfficiency(metric.efficiency)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Секция Конверсии */}
            <div className="marketing-section">
                <div className="section-header">
                    <h2 className="section-title">Конверсии</h2>
                </div>
                <div className="section-content">
                    <div className="summary-list">
                        {data.conversions.summary.map((item, index) => (
                            <div key={index} className="summary-item">
                                <span className="summary-label">{item.label}</span>
                                <div className={`summary-value ${getSummaryArrowClass(item.change, item.isPositive)}`}>
                                    <span className={`summary-arrow ${getSummaryArrowClass(item.change, item.isPositive)}`}>
                                        {getSummaryArrow(item.change)}
                                    </span>
                                    <span className="summary-text">{item.value}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="metrics-table-container">
                        <table className="metrics-table">
                            <thead>
                                <tr>
                                    <th>№ п/п</th>
                                    <th>Показатель</th>
                                    <th>Октябрь</th>
                                    <th>Сентябрь</th>
                                    <th>Август</th>
                                    <th>Эффективность, %</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.conversions.metrics.map((metric) => (
                                    <tr key={metric.id}>
                                        <td className="row-number">{metric.id}</td>
                                        <td className="indicator-cell">{metric.indicator}</td>
                                        <td>{formatValue(metric.october)}</td>
                                        <td>{formatValue(metric.september)}</td>
                                        <td>{formatValue(metric.august)}</td>
                                        <td className={`efficiency ${getEfficiencyClass(metric.efficiency, metric.indicator)}`}>
                                            {formatEfficiency(metric.efficiency)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Marketing;

