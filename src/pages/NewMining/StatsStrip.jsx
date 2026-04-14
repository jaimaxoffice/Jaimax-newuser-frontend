import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Cpu, Wifi, Award, TrendingUp } from "lucide-react";
const stats = [
    { value: 50000, suffix: "+", label: "Active Miners" },
    { value: 6, suffix: "x", label: "Daily Cycles" },
    { value: 100, suffix: "%", label: "Mobile-Based" },
    { value: 0, suffix: " Hardware", label: "Required" },
];
const marqueeItems = [
    { icon: Cpu, text: "Mobile Mining" },
    { icon: Wifi, text: "No Hardware" },
    { icon: Award, text: "JMC Rewards" },
    { icon: TrendingUp, text: "Daily Cycles" },
    { icon: Cpu, text: "Crypto India" },
    { icon: Wifi, text: "Beginner Friendly" },
    { icon: Award, text: "Free JMC Coins" },
    { icon: TrendingUp, text: "App Based" },
];
const CounterNumber = ({ target, suffix }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!inView)
            return;
        const duration = 2000;
        const start = Date.now();
        const tick = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1)
                requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }, [inView, target]);
    return (<span ref={ref} className="counter-number">
      {count}{suffix}
    </span>);
};
const StatsStrip = () => {
    return (<section id="stats" className="py-16 relative overflow-hidden">
      <div className="section-divider mb-16"/>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (<motion.div key={s.label} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="glass border-glow-animated rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300">
              <div className="text-3xl lg:text-4xl font-bold gradient-text-brand mb-1">
                <CounterNumber target={s.value} suffix={s.suffix}/>
              </div>
              <div className="text-black/50 text-sm">{s.label}</div>
            </motion.div>))}
        </div>
      </div>

      <div className="overflow-hidden py-4 relative">
        <div className="absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-[hsl(222,47%,4%)] to-transparent z-10 pointer-events-none"/>
        <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-[hsl(222,47%,4%)] to-transparent z-10 pointer-events-none"/>
        <div className="marquee-inner">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (<div key={i} className="flex items-center gap-3 mx-6 glass-brand rounded-full px-5 py-2.5 flex-shrink-0">
              <item.icon className="w-4 h-4 text-[#085259]"/>
              <span className="text-black/70 text-sm font-medium whitespace-nowrap">{item.text}</span>
            </div>))}
        </div>
      </div>

      <div className="section-divider mt-16"/>
    </section>);
};
export default StatsStrip;
