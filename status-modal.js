"use strict";

import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion, AnimatePresence } from "framer-motion";
import lottie from "lottie-web";

/* =========================================
   PASSOS DO ACOMPANHAMENTO
========================================= */

const STEPS = [
    { key: "pending", label: "Criado", icon: "📝" },
    { key: "progress", label: "Em andamento", icon: "🔧" },
    { key: "done", label: "Concluído", icon: "✅" }
];

function stepIndex(status) {
    const index = STEPS.findIndex(step => step.key === status);
    return index === -1 ? 0 : index;
}

/* =========================================
   ANIMAÇÃO LOTTIE (CHECK DE CONCLUSÃO)
========================================= */

function LottieCheck() {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return undefined;

        const animation = lottie.loadAnimation({
            container: containerRef.current,
            renderer: "svg",
            loop: false,
            autoplay: true,
            path: "./success-check.json"
        });

        return () => animation.destroy();
    }, []);

    return React.createElement("div", { className: "status-step-lottie", ref: containerRef });
}

/* =========================================
   MODAL (FRAMER MOTION)
========================================= */

function StatusModal({ task, onClose }) {
    const currentIndex = stepIndex(task.status);

    useEffect(() => {
        document.body.style.overflow = "hidden";

        const handleKeyDown = event => {
            if (event.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose]);

    return React.createElement(
        motion.div,
        {
            className: "status-modal-backdrop",
            onClick: onClose,
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            transition: { duration: 0.2 }
        },
        React.createElement(
            motion.div,
            {
                className: "status-modal-sheet",
                onClick: event => event.stopPropagation(),
                initial: { y: "100%" },
                animate: { y: 0 },
                exit: { y: "100%" },
                transition: { type: "spring", damping: 28, stiffness: 260 }
            },
            React.createElement("div", { className: "status-modal-handle" }),

            React.createElement(
                "div",
                { className: "status-modal-header" },
                React.createElement(
                    "div",
                    null,
                    React.createElement("span", { className: "status-modal-label" }, "Acompanhar status"),
                    React.createElement("h3", null, `${task.icon} ${task.title}`)
                ),
                React.createElement(
                    "button",
                    { className: "status-modal-close", onClick: onClose, "aria-label": "Fechar" },
                    "✕"
                )
            ),

            React.createElement(
                "div",
                { className: "status-tracker" },
                STEPS.map((step, index) => {
                    const state = index < currentIndex ? "done" : index === currentIndex ? "current" : "upcoming";
                    const showLottie = step.key === "done" && state === "current";

                    return React.createElement(
                        "div",
                        { key: step.key, className: `status-tracker-item ${state}` },
                        React.createElement(
                            "div",
                            { className: "status-tracker-node" },
                            showLottie ? React.createElement(LottieCheck) : React.createElement("span", null, step.icon)
                        ),
                        index < STEPS.length - 1
                            ? React.createElement("div", { className: `status-tracker-line ${index < currentIndex ? "filled" : ""}` })
                            : null,
                        React.createElement("span", { className: "status-tracker-label" }, step.label)
                    );
                })
            ),

            React.createElement(
                "p",
                { className: "status-modal-hint" },
                `Criada em ${task.date}` + (task.completedAt ? ` · Concluída em ${task.completedAt}` : "")
            )
        )
    );
}

/* =========================================
   RAIZ REACT & PONTE COM O SCRIPT.JS
========================================= */

function Root() {
    const [task, setTask] = useState(null);

    useEffect(() => {
        window.openStatusModal = openedTask => setTask(openedTask);
    }, []);

    return React.createElement(
        AnimatePresence,
        null,
        task ? React.createElement(StatusModal, { key: task.id, task, onClose: () => setTask(null) }) : null
    );
}

const rootElement = document.getElementById("statusModalRoot");
if (rootElement) {
    createRoot(rootElement).render(React.createElement(Root));
}
